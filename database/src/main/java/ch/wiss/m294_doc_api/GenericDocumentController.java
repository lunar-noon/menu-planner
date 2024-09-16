package ch.wiss.m294_doc_api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/{collectionName}/documents")
public class GenericDocumentController {

    @Autowired
    private GenericDocumentService genericDocumentService;

    @PostMapping
    public GenericDocument createDocument(@PathVariable String collectionName, @RequestBody GenericDocument document) {
        return genericDocumentService.save(collectionName, document);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocument(@PathVariable String collectionName, @PathVariable String id, @RequestBody GenericDocument document) {
        if (document.getId() == null || !document.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Document ID in the request body must match the ID in the URL.");
        }
        return genericDocumentService.updateById(collectionName, id, document)
                .map(updatedDocument -> ResponseEntity.ok(updatedDocument)) // 200 OK with updated document
                .orElse(ResponseEntity.notFound().build()); // 404 Not Found if document does not exist
    }

    @GetMapping
    public List<GenericDocument> getAllDocuments(@PathVariable String collectionName) {
        return genericDocumentService.findAll(collectionName);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericDocument> getDocumentById(@PathVariable String collectionName, @PathVariable String id) {
        return genericDocumentService.findById(collectionName, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String collectionName, @PathVariable String id) {
        boolean isDeleted = genericDocumentService.deleteById(collectionName, id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // 204 No Content, wenn erfolgreich gelöscht
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found, wenn kein Dokument gefunden wurde
        }
    }
}
