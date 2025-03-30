package com.SGR.Backend.controller;

import com.SGR.Backend.model.Candidat;
import com.SGR.Backend.service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/candidat")
public class CandidatController {

    @Autowired
    private CandidatService candidatService;


    @PostMapping("/register")
    public ResponseEntity<?> registerCandidat(@RequestBody Candidat candidat){
        try{
            this.candidatService.register(candidat);
            return ResponseEntity.status(HttpStatus.CREATED).body("registrado correctamente ;)");
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }

    @GetMapping("/getAllCandidats")
    public List<Candidat> getAllCandidats(){
        return candidatService.findAll();
    }

}
