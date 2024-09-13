# M294-MongoDB-API

1. generische Mongo-DB - basierte REST-API <http:localhost:8080/{your-collection}/documents>
2. Mongodb-Administrations-WebUI <http://localhost:8081/db/demo-store/>

    * Benutzer: root
    * Passwort: example

## Benutzung

`docker compose up -d` sollte ausreichend sein. Die Daten des Mongo-DB Containers werden persistent gespeichert.

Wenn das `greenorca/m294-project-api:1.0` nicht geladen werden kann, oder Du etwas am API-*src*-Code verändert hast, erstellst Du das Image lokal mit `docker compose up -d --build`

Die *CORS*-Konfiguration ist für beliebige URLs und Ports frei.

## Api-Documentation

* Basis-URL: <http://localhost:8080/{your-collection}/documents>
* *{your-collection}* ist ein beliebiger, selbstgewählter Name deiner *collection*, beispielsweise:

  * *contacts* für Kontakte
  * *todos* für eine Todo-Liste

  Alle *collections* werden per Default in der demo-store Datenbank abgelegt. Auf Fremdschlüsselbeziehungen zwischen *collections* soll verzichtet werden.

### Allgemeiner Aufbau der *documents*

Jedes *document* in deiner Collection hat eine automatisch generierte *_id* und ein *content*-Attribut. Das *content*-Attribut enthält ein JSON-Objekt mit beliebigen Aufbau, beispielsweise

```json
  {
    "content" : {
        {
        "title": "Geschenkli posten",
        "text": "Opa: Olivenöl; Oma: Kräuterlikör",
        "due-to": "2024-12-23"
      }
    }
  }
```

Achte darauf, dass das *content*-Attribut möglichst immer gleich aufgebaut ist, also immer die gleichen Attribute enthält.

### API Requests

1. GET-Request: ruft alle gespeicherten Dokumente aus der aktuellen Collection
2. POST-Request: speichert ein neues JSON-Dokument in der aktuellen Collection
3. PUT-Request: updated gespeichertes Dokument in der aktuellen Collection
4. DELETE-Request: entfernt gespeichertes Dokument mit gegebener ID aus der aktuellen Collection

siehe <http://localhost:8080/v3/api-docs>

