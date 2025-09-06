# Mars Rover Test List

## ✅ Completed Features
- [x] Turn left (L) - single command
- [x] Turn right (R) - single command  
- [x] Multiple turn commands (e.g., "LL", "RR", "LR")
- [x] Test all direction transitions:
  - [x] Left: N→W→S→E→N (LLLL test)
  - [x] Right: N→E→S→W→N (RRRR test)

## 🚧 Next Features to Implement

### Movement Commands
- [ ] Move forward (F) - single step in current direction
- [ ] Move backward (B) - single step opposite to current direction
- [ ] Combined movement and turning (e.g., "LFR", "FRBL")

### Position and Direction Tests
- [ ] Position tracking after movement
- [ ] Complex command sequences (e.g., "LFRFRFRFF")

### Edge Cases and Validation  
- [ ] Invalid commands (ignore unknown characters)
- [ ] Empty command string
- [ ] Case sensitivity (if applicable)
- [ ] Very long command strings

### Advanced Features (Future)
- [ ] Grid boundaries and wrapping
- [ ] Obstacle detection and stopping
- [ ] Position reporting/status query
- [ ] Multiple rovers on same grid
- [ ] Rover state persistence

## Test Strategy Notes
- Follow strict TDD: Red → Green → Refactor
- One failing test at a time
- Minimal implementation to pass tests
- Refactor only when all tests are green