#Command1

`SELECT bloodGroup, SUM(quantity) FROM bloodstock GROUP BY bloodGroup;`
`SELECT quantity, bloodgroup FROM donations NATURAL JOIN users;`
`SELECT quantity, bloodgroup FROM donations NATURAL JOIN users WHERE hospitalid = 1;`
`SELECT SUM(quantity), bloodgroup FROM donations NATURAL JOIN users WHERE hospitalid = 1 GROUP BY bloodgroup;`
`SELECT hospitalid, bloodgroup, quantity FROM hospitals NATURAL JOIN bloodstock WHERE bloodgroup = 'A+';`
