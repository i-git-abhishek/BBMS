CREATE OR REPLACE FUNCTION updateBloodStockOnDonation()
RETURNS TRIGGER AS $$
DECLARE
    userBloodGroup VARCHAR(5);
BEGIN
    SELECT bloodGroup INTO userBloodGroup
    FROM users
    WHERE userID = NEW.userID;

    IF EXISTS(
        SELECT 1 FROM bloodStock
        WHERE hospitalID = NEW.hospitalID
        AND bloodGroup = userBloodGroup
    ) THEN

        UPDATE bloodStock
        SET quantity = quantity + NEW.quantity
        WHERE hospitalID = NEW.hospitalID
        AND bloodGroup = userBloodGroup;
    
    ELSE
        INSERT INTO bloodStock (hospitalID, bloodGroup, quantity)
        VALUES (NEW.hospitalID, userBloodGroup, NEW.quantity);

    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION updateBloodStockOnRequest()
RETURNS TRIGGER AS $$
DECLARE
    userBloodGroup VARCHAR(5);
BEGIN
    SELECT bloodGroup INTO userBloodGroup
    FROM users
    WHERE userID = NEW.userID;

    IF EXISTS (
        SELECT 1 FROM bloodStock
        WHERE hospitalID = NEW.hospitalID
          AND bloodGroup = userBloodGroup
          AND quantity >= NEW.quantity
    ) THEN
        UPDATE bloodStock
        SET quantity = quantity - NEW.quantity,
            updatedAt = CURRENT_TIMESTAMP
        WHERE hospitalID = NEW.hospitalID
          AND bloodGroup = userBloodGroup;

        NEW.status := 'Approved';
    ELSE
        NEW.status := 'Rejected';
        RAISE NOTICE 'Not enough stock — request rejected.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION isEligibleToDonate()
RETURNS TRIGGER AS $$
DECLARE
    userDOB DATE;
    isEligible BOOLEAN;
    userAge INTEGER;
BEGIN 
    SELECT DOB,eligible INTO userDOB, isEligible
    FROM users
    WHERE userID = NEW.userID;

    userAge := EXTRACT(YEAR FROM AGE(CURRENT_DATE, userDOB));

    IF userAge >= 18 AND isEligible THEN
        RETURN NEW;
    ELSE
        RAISE NOTICE 'User with ID % is not eligible to donate blood.', NEW.userID;
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;




CREATE TRIGGER DonationTrigger
BEFORE INSERT ON donations 
FOR EACH ROW
EXECUTE FUNCTION updateBloodStockOnDonation();

CREATE TRIGGER RequestTrigger
BEFORE INSERT ON requests 
FOR EACH ROW
EXECUTE FUNCTION updateBloodStockOnRequest();

CREATE TRIGGER DonationEligibilityTrigger
BEFORE INSERT ON donations
FOR EACH ROW
EXECUTE FUNCTION isEligibleToDonate();
