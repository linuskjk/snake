import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;

public class GameSaveHandler {
    // Method to save the game data (e.g., high scores)
    public void saveGameData(String username, int score) {
        JSONObject obj = new JSONObject();
        obj.put("player", username);
        obj.put("score", score);

        try (FileWriter file = new FileWriter("scores.json", true)) {
            file.write(obj.toString() + System.lineSeparator());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Method to retrieve the high scores
    public List<Score> getHighScores() {
        // Logic to retrieve and return a list of high scores
        return new ArrayList<>();
    }
    
    // Inner class to represent a score entry
    public class Score {
        private String username;
        private int score;

        public Score(String username, int score) {
            this.username = username;
            this.score = score;
        }

        public String getUsername() {
            return username;
        }

        public int getScore() {
            return score;
        }
    }
}