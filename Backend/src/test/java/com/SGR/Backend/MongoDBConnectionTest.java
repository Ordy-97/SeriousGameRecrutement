package com.SGR.Backend;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;

public class MongoDBConnectionTest {
    @Test
    void testMongoDBConnection() {
        String uri = "mongodb://localhost:27017/bigbase";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("bigbase");
            assertNotNull(database, "La connexion à la base de données MongoDB a échoué !");
            System.out.println("Connexion à MongoDB réussie !");
        } catch (Exception e) {
            fail("Erreur lors de la connexion à MongoDB : " + e.getMessage());
        }
    }
}
