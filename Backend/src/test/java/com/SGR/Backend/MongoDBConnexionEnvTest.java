package com.SGR.Backend;


import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MongoDBConnexionEnvTest {

    @Test
    void testEnvVariable() {
        Dotenv dotenv = Dotenv.load(); // Charger .env
        String mongoUri = dotenv.get("MONGODB_URI"); // Récupérer la variable
        
        assertNotNull(mongoUri, "La variable d'environnement MONGODB_URI ne doit pas être null !");
        System.out.println("MongoDB URI from .env: " + mongoUri);
    }
}
