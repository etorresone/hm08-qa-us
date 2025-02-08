# Sprint 8 project-Elia Torres- Project hm08-qa-us

## Description

The purpose of this project is to write tests and execute them for the Urban Routes application on VS code.
We will be writing tests, running tests, with the purpose of testing the apps functionality. 

### Set-Up and project prequisites

Before begining any testing we need to have Vscode, Gitbash installed,in the computer, along with a Github account.

1.  Connect Github account to Triple Ten's plaform
2.  Clone repository with the name hm08-qa-us to our local computer using Gitbash
    To clone the repository... 1. open gitbash 2. create a directory to store all of your projects.

        For example:
        cd ~               # make sure you're in your home directory
        mkdir projects     # create a folder called projects
        cd projects        # change directory into the new projects folder

        # if you are using HTTPS
        git clone https://github.com/username/hm08-qa-us.git

        # if you are using SSH
        git clone git@github.com:username/hm08-qa-us.git

## Testing set-up

    1. open project hm08-qa-us in vsCode
    2. run npm install in the vsCode terminal
    3. start the tripleten server & copy the url
    4. paste the server URL into the wdio.config.js file of your vscode project
    5. tests and their respective functions will be written in the createAnOrder.e2e.js file
    6. selectors and interactive elements will be written in the page.js file
    7. utility functions will be stored in the helper.js file 
    8. start writing tests, selectors, functions to cover the full process of ordering a taxi. 

## Creating tests for the full process of ordering a taxi-test should cover the following: 

    1. Setting the address
    2. Selecting Supportive plan
    3. Filling in the phone number
    4. Adding a credit card 
    5. Writing a message for the driver
    6. Ordering a Blanket and handkerchiefs 
    7. Ordering 2 Ice creams
    8. The car search modal appears
## Running tests
    1. make sure the server url is active
    2. to run all tests type the command npm run wdio in the terminal 
    3. make sure all tests are passing

## Conclusion

If necessary write bug reports and document any issues faced when testing