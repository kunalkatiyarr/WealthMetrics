# Updated on 2026-07-15 14:30:15 for: chore: add Docker support
# Updated on 2026-07-15 14:30:15 for: chore: add Docker support
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Files copy 
COPY . .

# Maven wrapper 
RUN chmod +x mvnw

# Spring boot JAR file 
RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:21-jre-alpine
WORKDIR /app


COPY --from=build /app/target/*.jar app.jar


EXPOSE 8080


ENTRYPOINT ["java", "-jar", "app.jar"]