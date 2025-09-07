import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        port(8080);
        System.out.println("Starting Snake Game Server...");

        // Enable CORS
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
        });

        post("/save", (req, res) -> {
            String body = req.body();
            System.out.println("Received score: " + body);
            // Here, you could parse the JSON and save to a file or database
            return "Score received";
        });

        // Example usage:
        GameSaveHandler.saveScore("Player1", 123);
        System.out.println("Score saved to scores.json");
    }
}