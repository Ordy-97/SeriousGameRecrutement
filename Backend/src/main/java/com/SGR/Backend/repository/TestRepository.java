package com.SGR.Backend.repository;

import com.SGR.Backend.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends MongoRepository<Test,String> {

}
