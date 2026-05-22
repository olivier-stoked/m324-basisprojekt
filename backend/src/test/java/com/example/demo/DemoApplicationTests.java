package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.sql.Date;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {

        	// eonrichten von der Mock-Umgebung für den REST-Controler
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    void contextLoads() {
        assertTrue(true, "alles gut");
    }

    @Test
    void createTask() {
        Task task = new Task();
        task.setTaskdescription("test");
        assertTrue(task.getTaskdescription().equals("test"), "Task description should be 'test'");
    }

    @Test
    void addTaskTest() throws Exception {
        		// testet den POST-Requestt (MockMvc)
        mockMvc.perform(post("/tasks")
                .content("{\"taskdescription\":\"Test Task\"}")
                .contentType("application/json"))
                .andExpect(status().isOk());
    }

    // tdd test für das neue feat. deadline
    @Test
    void addDeadlineTest() {
        Task task = new Task();
        long millis = System.currentTimeMillis();
        Date testDate = new Date(millis);
        
        	// fuet dem Task ein Datum hinzu und prüft, daß es korrekt gespeichert wird
			
        task.setDeadline(testDate);
        assertTrue(task.getDeadline().equals(testDate), "Deadline wurde nicht korrekt gespeichert");
    }
}