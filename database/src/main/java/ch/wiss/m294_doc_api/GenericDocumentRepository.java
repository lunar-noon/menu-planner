package ch.wiss.m294_doc_api;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GenericDocumentRepository extends MongoRepository<GenericDocument, String> {
}
