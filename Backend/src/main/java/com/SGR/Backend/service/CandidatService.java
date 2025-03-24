package com.SGR.Backend.service;

import com.SGR.Backend.model.Candidat;
import com.SGR.Backend.repository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatService {

    @Autowired
    private CandidatRepository candidatRepository;

    public void register(Candidat candidat) {
        if(candidatRepository.existsByEmail(candidat.getEmail())){
            throw new RuntimeException("Un candidat avec cet email existe déjà !");
        }
        candidatRepository.save(candidat);
    }

    public List<Candidat> findAll() {
        return candidatRepository.findAll();
    }
}
