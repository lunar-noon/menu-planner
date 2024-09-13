# Use a multi-stage build to build the application and create a smaller final image
# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

#COPY wait-for-mysql.sh .
#RUN chmod +x wait-for-mysql.sh
#RUN apt update
#RUN apt install -y mariadb-client
EXPOSE 8080
#ENTRYPOINT ["./wait-for-mysql.sh", "wiss_quiz_db" , "java", "-jar", "app.jar"]
ENTRYPOINT ["java", "-jar", "app.jar"]