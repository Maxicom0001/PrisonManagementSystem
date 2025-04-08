package server.config;

import static spark.Spark.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class SparkConfig {

    public static void configure() {
        Properties props = loadProperties();

        // Port
        port(Integer.parseInt(props.getProperty("server.port", "4567")));

        // CORS
        if (Boolean.parseBoolean(props.getProperty("cors.enabled", "false"))) {
            enableCORS(props.getProperty("cors.origin", "*"));
        }

        // Inicjalizacja innych rzeczy
        before((req, res) -> {
            res.type("application/json");
        });

        // Obsługa błędów
        notFound((req, res) -> {
            res.type("application/json");
            return "{\"message\":\"Not found\"}";
        });

        internalServerError((req, res) -> {
            res.type("application/json");
            return "{\"message\":\"Something went wrong\"}";
        });
    }

    private static Properties loadProperties() {
        Properties props = new Properties();
        try (InputStream input = SparkConfig.class.getClassLoader().getResourceAsStream("application.properties")) {
            if (input != null) {
                props.load(input);
            }
        } catch (IOException e) {
            System.err.println("Failed to load application.properties: " + e.getMessage());
        }
        return props;
    }

    private static void enableCORS(String origin) {
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
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", "*");
            response.header("Access-Control-Allow-Headers", "*");
            response.type("application/json");
        });
    }
}