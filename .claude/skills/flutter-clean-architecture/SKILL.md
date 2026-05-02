# Flutter Clean Architecture Skill

## Purpose

This skill helps the agent scaffold and maintain Flutter projects using clean architecture principles. Use it when the user asks to organize, refactor, or structure a Flutter codebase for scalability and testability.

## Trigger

Use this skill when:
- User asks to "organize" or "structure" a Flutter project
- User mentions clean architecture, SOLID, repository pattern, use cases, or DI
- User wants to add tests to an existing Flutter app
- User is building a medium-to-large Flutter app that needs to scale

## Folder Structure

```text
lib/
  core/
    errors/
      failures.dart
      exceptions.dart
    usecases/
      usecase.dart          # abstract interface UseCase<Type, Params>
    utils/
  features/
    <feature_name>/
      data/
        datasources/
          <feature>_local_datasource.dart
          <feature>_remote_datasource.dart
        models/
          <feature>_model.dart    # extends domain entity
        repositories/
          <feature>_repository_impl.dart
      domain/
        entities/
          <feature>_entity.dart   # pure Dart, no Flutter dependency
        repositories/
          <feature>_repository.dart  # abstract interface
        usecases/
          get_<feature>.dart
          create_<feature>.dart
      presentation/
        controllers/
          <feature>_controller.dart   # ChangeNotifier / Riverpod / GetX
        screens/
          <feature>_screen.dart
        widgets/
          <feature>_widget.dart
  injection_container.dart    # dependency injection setup (get_it)
  main.dart
```

## Key Principles

1. **Dependency Rule**: Inner layers never depend on outer layers
   - Domain layer: pure Dart, zero Flutter imports
   - Data layer: implements domain interfaces
   - Presentation layer: depends on domain use cases only

2. **Entities vs Models**: Entities are domain objects. Models extend entities and add JSON serialization.

3. **Repository Pattern**: Abstract interface in domain, implementation in data layer.

4. **Use Cases**: One class per operation (GetProducts, AddToCart, etc.)

## Recommended Packages

```yaml
dependencies:
  get_it: ^7.6.0          # dependency injection
  dartz: ^0.10.1          # Either type for error handling
  equatable: ^2.0.5       # value equality for entities

dev_dependencies:
  mockito: ^5.4.0
  build_runner: ^2.4.0
```

## Error Handling Pattern

Use `Either<Failure, T>` from dartz:

```dart
abstract class ProductRepository {
  Future<Either<Failure, List<Product>>> getProducts();
}
```

## State Management

Prefer **Riverpod** for clean architecture projects (better separation of concerns than Provider).
Use **GetX** for rapid prototyping.
Use **Provider** for simple projects.

## Validation Checklist

- [ ] Domain layer has zero Flutter imports
- [ ] All repository methods return `Either<Failure, T>`
- [ ] Use cases have a single `call()` method
- [ ] DI container registered in `injection_container.dart`
- [ ] Models handle `fromJson` / `toJson`
- [ ] Entities implement `Equatable`
