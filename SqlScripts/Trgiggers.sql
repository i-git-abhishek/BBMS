CREATE OR REPLACE FUNCTION updateBloodStockOnDonation()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS(
        SELECT 1 FROM bloodStock
        WHERE hospitalID = NEW.hospitalID
        AND bloodGroup = NEW.bloodGroup
    ) THEN

        UPDATE bloodStock
        SET quantity = quantity + NEW.quantity
        WHERE hospitalID = NEW.hospitalID
        AND bloodGroup = NEW.bloodGroup;
    
    ELSE
        INSERT INTO bloodStock (hospitalID, bloodGroup, quantity)
        VALUES (NEW.hospitalID, NEW.bloodGroup, NEW.quantity);

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

    IF EXISTS(
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

        UPDATE requests
        SET status = 'Approved'
        WHERE reqID = NEW.reqID;

    ELSE
        UPDATE requests
        SET status = 'Rejected'
        WHERE reqID = NEW.reqID;
        RAISE EXCEPTION 'Not enough blood stock available for the requested blood group.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION isEligibleToDonate()
RETURNS TRIGGER AS $$
DECLARE
    userDOB DATE;
BEGIN 
    SELECT DOB INTO userDOB
    FROM users
    WHERE userID = NEW.userID;

    IF CURRENT_DATE - userDOB >= INTERVAL '18 years' THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Not Eligible To Donate Blood. ';
    END IF;
END;
$$ LANGUAGE plpgsql;




CREATE TRIGGER DonationTrigger
AFTER INSERT ON donations 
FOR EACH ROW
EXECUTE FUNCTION updateBloodStockOnDonation();

CREATE TRIGGER RequestTrigger
AFTER INSERT ON requests 
FOR EACH ROW
EXECUTE FUNCTION updateBloodStockOnRequest();

CREATE TRIGGER DonationEligibilityTrigger
BEFORE INSERT ON donations
FOR EACH ROW
EXECUTE FUNCTION isEligibleToDonate();
