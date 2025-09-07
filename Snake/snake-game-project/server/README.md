# Snake Game Server Documentation

# Snake Game Server

This is the server-side component of the Snake game project. It is built using Java and is responsible for handling game data, including saving and retrieving high scores.

## Getting Started

To run the server, you will need to have Java Development Kit (JDK) and Maven installed on your machine.

### Prerequisites

- Java JDK 11 or higher
- Maven 3.6 or higher

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd snake-game-project/server
   ```

2. Build the project using Maven:
   ```
   mvn clean install
   ```

3. Run the server:
   ```
   mvn exec:java -Dexec.mainClass="src.Main"
   ```

## Usage

The server listens for incoming requests related to game data. You can interact with the server through HTTP requests to save and retrieve high scores.

### Endpoints

- `POST /saveScore`: Save a player's score.
- `GET /getHighScores`: Retrieve the list of high scores.

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.