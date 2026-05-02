# Flutter Animations UI Skill

## Purpose

This skill helps the agent implement smooth, professional animations in Flutter apps. Use it when the user asks to add animations, transitions, motion, or polish to a Flutter UI.

## Trigger

Use this skill when:
- User asks for "animations", "transitions", "motion", "smooth UI" in Flutter
- User wants to improve the visual feel or polish of an existing Flutter app
- User wants to clone or match a premium mobile app's animation style
- User mentions Hero, PageView, Lottie, staggered animations, or parallax

## Animation Patterns

### 1. Hero Animations (shared element transitions)

```dart
// In source screen
Hero(
  tag: 'product-${product.id}',
  child: Image.network(product.imageUrl),
)

// In destination screen
Hero(
  tag: 'product-${product.id}',
  child: Image.network(product.imageUrl),
)
```

Rules:
- Tag must be unique per element
- Both source and destination must have the same tag
- Works automatically with Navigator.push

### 2. AnimatedOpacity (fade in/out)

```dart
AnimatedOpacity(
  opacity: _isVisible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 500),
  curve: Curves.easeInOut,
  child: widget,
)
```

### 3. AnimatedContainer (size/color/shape transitions)

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  width: _isExpanded ? 200 : 100,
  decoration: BoxDecoration(
    color: _isSelected ? Colors.amber : Colors.white,
    borderRadius: BorderRadius.circular(_isSelected ? 20 : 8),
  ),
  child: widget,
)
```

### 4. SlideTransition (enter from bottom/side)

```dart
class _MyScreenState extends State<MyScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
    _controller.forward();
  }
}
```

### 5. Staggered List Animations

```dart
ListView.builder(
  itemBuilder: (context, index) {
    return AnimationConfiguration.staggeredList(
      position: index,
      duration: const Duration(milliseconds: 375),
      child: SlideAnimation(
        verticalOffset: 50.0,
        child: FadeInAnimation(child: ItemWidget()),
      ),
    );
  },
)
```
Package: `flutter_staggered_animations: ^1.1.1`

### 6. Page Transitions (custom route animation)

```dart
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => TargetScreen(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    return FadeTransition(opacity: animation, child: child);
  },
  transitionDuration: const Duration(milliseconds: 300),
)
```

### 7. Lottie Animations

```dart
// pubspec.yaml: lottie: ^3.0.0
Lottie.asset('assets/animations/loading.json', width: 200, height: 200)
```

## Curves Reference

| Curve | Use Case |
|-------|----------|
| `Curves.easeInOut` | General purpose, feels natural |
| `Curves.easeOut` | Entering elements (decelerate) |
| `Curves.easeIn` | Exiting elements (accelerate) |
| `Curves.bounceOut` | Playful, energetic UI |
| `Curves.elasticOut` | Spring-like, modern feel |
| `Curves.fastOutSlowIn` | Material motion standard |

## Recommended Packages

```yaml
dependencies:
  lottie: ^3.0.0
  flutter_staggered_animations: ^1.1.1
  animations: ^2.0.8    # Material motion transitions
```

## Performance Rules

- Use `RepaintBoundary` to isolate expensive animations
- Prefer `const` constructors in animated subtrees
- Avoid rebuilding the entire widget tree — use `AnimationController` + `AnimatedBuilder`
- Use `Curves` instead of linear for all duration-based animations
- Test on real device or profile mode — animations look different in debug mode

## Validation Checklist

- [ ] Hero tags are unique per element
- [ ] AnimationControllers are disposed in `dispose()`
- [ ] No jank on scroll — use `flutter run --profile` to verify
- [ ] Durations between 200ms–500ms for most UI transitions
- [ ] Curves applied to all Tween animations
