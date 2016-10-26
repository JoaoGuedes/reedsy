![Screenshot](https://github.com/JoaoGuedes/reedsy/blob/master/resources/screenshot.png "Screenshot")

Node **0.12.9** used on server, with NPM ***2.14.0***

To install Node with NPM, open a Bash shell and install Homebrew:

    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Then:

	brew install nvm
	nvm install 0.12.9
	nvm use 0.12.9

Clone this project, *cd* to the root directory and run:

	./start.sh

It will install NPM and Bower dependencies, run the server and open up a browser.
