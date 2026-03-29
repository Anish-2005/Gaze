# Contributing to GAZE

Thanks for contributing to GAZE. This project is focused on accessibility-critical communication software, so quality, safety, and clarity matter as much as velocity.

## Ground Rules

- Accessibility is non-negotiable.
- Privacy-sensitive behavior must be explicit and reviewable.
- New features should not degrade latency in the demo flow.
- Keep pull requests focused and scoped.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies.
3. Start the development server.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Branching and Commits

- Branch from `main` (or the default active branch in the repo).
- Use descriptive branch names, for example: `feat/demo-calibration-overlay`.
- Keep commits atomic and readable.
- Preferred commit style: `type(scope): summary`.

Examples:

- `feat(demo): improve dwell feedback timing`
- `fix(api): guard empty prediction payload`
- `docs(readme): update setup instructions`

## Before Opening a PR

Run the quality checks locally:

```bash
npm run lint
npm run type-check
npm test
npm run build
```

If your changes affect interaction performance or rendering behavior, also run:

```bash
npm run performance
```

## Pull Request Checklist

- The change is focused and justified.
- Accessibility implications were considered and tested.
- No sensitive data is logged or persisted unintentionally.
- Tests were added or updated when behavior changed.
- Documentation is updated if user-facing behavior changed.

## Code Style Expectations

- Use TypeScript-first patterns and explicit types for non-trivial logic.
- Prefer small, composable React components.
- Keep side effects isolated and predictable.
- Use existing utilities from `src/lib` before introducing new abstractions.

## Reporting Issues

When filing an issue, include:

- Expected behavior
- Actual behavior
- Reproduction steps
- Browser and device details
- Screenshots or short recordings when relevant

Use clear labels when possible (`bug`, `enhancement`, `accessibility`, `performance`).

## Security and Privacy Notes

Do not open public issues with secrets, tokens, or personal data. If you identify a privacy or security-sensitive defect, share only a minimal reproducible description until maintainers can triage safely.

## License

By contributing, you agree that your contributions are licensed under the MIT License in this repository.
