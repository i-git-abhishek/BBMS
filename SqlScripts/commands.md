#Command1

`SELECT bloodGroup, SUM(quantity) FROM bloodstock GROUP BY bloodGroup;`
`SELECT quantity, bloodgroup FROM donations NATURAL JOIN users;`
`SELECT quantity, bloodgroup FROM donations NATURAL JOIN users WHERE hospitalID = 1;`
`SELECT SUM(quantity), bloodgroup FROM donations NATURAL JOIN users WHERE hospitalID = 1 GROUP BY bloodgroup;`
`SELECT hospitalID, bloodgroup, quantity FROM hospitals NATURAL JOIN bloodstock WHERE bloodgroup = 'A+';`
