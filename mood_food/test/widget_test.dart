import 'package:flutter_test/flutter_test.dart';
import 'package:mood_food/app.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const MoodFoodApp());
    expect(find.byType(MoodFoodApp), findsOneWidget);
  });
}
