# Design

- Theme: tournament hall bulletin board with brass accents, paper score sheets, and a deep green board surface.
- Core loop: select piece, validate move, switch turn, manage clocks, and force mate or flag.
- Twist: short blitz clocks with deterministic time increments and capture bonuses.
- Verification path: scripted Scholar's Mate line for deterministic self-check and capture artifacts.
- Board: fixed 8x8 desktop grid with white at the bottom, move highlights, last-move markers, and king-in-check warning rings.
- Score model: material points, check pressure bonus, decisive finish bonus, and surviving clock time converted into endgame points.
