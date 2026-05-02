import 'package:flutter/material.dart';
import '../models/product.dart';

class MoodHeader extends StatelessWidget {
  final CleanCategory category;
  final double height;

  const MoodHeader({
    super.key,
    required this.category,
    this.height = 120,
  });

  @override
  Widget build(BuildContext context) {
    return ClipPath(
      clipper: _DiagonalClipper(),
      child: Container(
        height: height,
        color: category.color,
        child: Center(
          child: Text(
            category.label,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w800,
              color: Colors.white,
              letterSpacing: 1.2,
            ),
          ),
        ),
      ),
    );
  }
}

class _DiagonalClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    path.lineTo(0, size.height - 30);
    path.lineTo(size.width, size.height);
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(_DiagonalClipper oldClipper) => false;
}
