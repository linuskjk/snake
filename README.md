# Snake Game Project

## Overview
This project is a web-based Snake game that utilizes HTML, CSS, and JavaScript for the client-side, with a Java server for saving game data. The game allows players to control a snake, collect food, and track their scores. 

## Project Structure
The project is organized into two main directories: `client` and `server`.

### Client
- **index.html**: The main HTML document that sets up the game canvas and includes references to the CSS and JavaScript files.
- **styles/main.css**: Contains styles for the game, enhancing the visual appearance.
- **scripts/snake.js**: Implements the game logic, including snake movement, collision detection, and score tracking.
- **README.md**: Documentation for the client-side, including instructions on how to run the game.

### Server
- **src/Main.java**: The entry point for the Java server application, handling incoming requests related to game data.
- **src/GameSaveHandler.java**: Logic for saving and retrieving game data, such as high scores or player progress.
- **pom.xml**: Maven configuration file specifying project dependencies and build settings.
- **README.md**: Documentation for the server-side, including instructions on how to run the server.

## Getting Started
To run the Snake game, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Set Up the Client**:
   - Navigate to the `client` directory.
   - Open `index.html` in a web browser to start the game.
3. **Set Up the Server**:
   - Navigate to the `server` directory.
   - Use Maven to build and run the server:
     ```
     mvn clean install
     mvn exec:java -Dexec.mainClass="Main"
     ```
4. **Play the Game**: Once the server is running, you can play the game in your browser. The game will save high scores on the server.

## Future Improvements
This project has a 10-step improvement plan to enhance the game over time, including adding multiplayer functionality, improving graphics, and implementing user authentication.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
