from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent
PATTERNS = ("Ã", "Â", "â", "�", "Ãƒ", "Ã‚")
EXTENSIONS = {".html", ".css", ".js", ".json", ".xml", ".svg", ".txt", ".md", ".php"}
SKIP_DIRS = {".git", "jocms"}
SKIP_FILES = {"jquery.maskedinput.js"}


def should_scan(path: Path) -> bool:
    if path.suffix.lower() not in EXTENSIONS:
        return False
    if path.name in SKIP_FILES:
        return False
    return not any(part in SKIP_DIRS for part in path.parts)


def main() -> int:
    hits = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or not should_scan(path):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            hits.append((path, "No es UTF-8 válido"))
            continue
        for pattern in PATTERNS:
            if pattern in text:
                hits.append((path, f"Posible mojibake: {pattern}"))
                break

    if not hits:
        print("OK: no se detectaron patrones de mojibake.")
        return 0

    print("Se detectaron posibles problemas de codificación:")
    for path, reason in hits:
        print(f"- {path.relative_to(ROOT)}: {reason}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
