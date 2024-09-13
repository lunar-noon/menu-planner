package ch.wiss.m294_doc_api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class GenericDocumentService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public GenericDocument save(String collectionName, GenericDocument document) {
        return mongoTemplate.save(document, collectionName);
    }

    public List<GenericDocument> findAll(String collectionName) {
        return mongoTemplate.findAll(GenericDocument.class, collectionName);
    }

    public Optional<GenericDocument> findById(String collectionName, String id) {
        return Optional.ofNullable(mongoTemplate.findById(id, GenericDocument.class, collectionName));
    }
    

    public boolean deleteById(String collectionName, String id) {
        validateCollectionName(collectionName);
        validateId(id);
        GenericDocument document = mongoTemplate.findById(id, GenericDocument.class, collectionName);
        if (document != null) {
            mongoTemplate.remove(document, collectionName);
            return true;  // Return true if document is found and deleted
        }
        return false;  // Return false if document is not found
    }

    private void validateCollectionName(String collectionName) {
        if (!StringUtils.hasText(collectionName)) {
            throw new IllegalArgumentException("Collection name must not be empty");
        }
    }

    private void validateDocument(GenericDocument document) {
        if (document == null) {
            throw new IllegalArgumentException("Document must not be null");
        }
    }

    private void validateId(String id) {
        if (!StringUtils.hasText(id)) {
            throw new IllegalArgumentException("ID must not be empty");
        }
    }

    public GenericDocument updateDocument(String collectionName, String id, GenericDocument document) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateDocument'");
    }
}
