// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalPassport {
    struct Passport {
        string name;
        string nationality;
        string passportNumber;
        string dateOfBirth;
        string placeOfBirth;
        uint256 issueDate;
        uint256 expirationDate;
    }

    mapping(address => Passport) private passports;
    mapping(string => address) private passportToOwner;

    event PassportCreated(address indexed user, string passportNumber, string name, string nationality, string dateOfBirth, string placeOfBirth, uint256 issueDate, uint256 expirationDate);
    event PassportUpdated(address indexed user, string passportNumber, string name, string nationality, string dateOfBirth, string placeOfBirth, uint256 issueDate, uint256 expirationDate);

    function createPassport(
        string memory _name,
        string memory _nationality,
        string memory _passportNumber,
        string memory _dateOfBirth,
        string memory _placeOfBirth,
        uint256 _issueDate,
        uint256 _expirationDate
    ) public {
        require(passportToOwner[_passportNumber] == address(0), "Passport already exists");

        Passport memory newPassport = Passport({
            name: _name,
            nationality: _nationality,
            passportNumber: _passportNumber,
            dateOfBirth: _dateOfBirth,
            placeOfBirth: _placeOfBirth,
            issueDate: _issueDate,
            expirationDate: _expirationDate
        });

        passports[msg.sender] = newPassport;
        passportToOwner[_passportNumber] = msg.sender;

        emit PassportCreated(msg.sender, _passportNumber, _name, _nationality, _dateOfBirth, _placeOfBirth, _issueDate, _expirationDate);
    }

    function updatePassport(
        string memory _name,
        string memory _nationality,
        string memory _passportNumber,
        string memory _dateOfBirth,
        string memory _placeOfBirth,
        uint256 _issueDate,
        uint256 _expirationDate
    ) public {
        require(passportToOwner[_passportNumber] == msg.sender, "Unauthorized to update this passport");

        Passport storage existingPassport = passports[msg.sender];
        existingPassport.name = _name;
        existingPassport.nationality = _nationality;
        existingPassport.passportNumber = _passportNumber;
        existingPassport.dateOfBirth = _dateOfBirth;
        existingPassport.placeOfBirth = _placeOfBirth;
        existingPassport.issueDate = _issueDate;
        existingPassport.expirationDate = _expirationDate;

        emit PassportUpdated(msg.sender, _passportNumber, _name, _nationality, _dateOfBirth, _placeOfBirth, _issueDate, _expirationDate);
    }

    function getPassport(address _user) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, uint256) {
        Passport storage passport = passports[_user];
        return (passport.name, passport.nationality, passport.passportNumber, passport.dateOfBirth, passport.placeOfBirth, passport.issueDate, passport.expirationDate);
    }

    function getPassportByNumber(string memory _passportNumber) public view returns (address) {
        return passportToOwner[_passportNumber];
    }
}
