"""
Repo-root ASGI entry for the monorepo (askpatioai-frontend).

Render: Root Directory = .  |  Start: uvicorn main:app --host 0.0.0.0 --port $PORT
Build must check out the submodule first, e.g.:
  git submodule update --init --recursive && pip install -r requirements.txt

The real FastAPI app lives in fastapi/main.py (submodule chrisyin888/fastapi).
"""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parent
_FASTAPI_DIR = _ROOT / "fastapi"
_BACKEND_MAIN = _FASTAPI_DIR / "main.py"

if not _BACKEND_MAIN.is_file():
    raise RuntimeError(
        "fastapi/main.py is missing. In Render, add a build step: "
        "git submodule update --init --recursive "
        "(and connect this service to a repo that includes the fastapi submodule)."
    )

# The submodule directory is named `fastapi`, same as the PyPI package. With cwd = repo
# root, a plain `import fastapi` would load that folder (namespace) instead of the library.
_root_resolved = _ROOT.resolve()
_primed_path = [
    p
    for p in sys.path
    if not (
        p == ""
        and Path.cwd().resolve() == _root_resolved
        or (p and Path(p).resolve() == _root_resolved)
    )
]
_saved_path = sys.path[:]
sys.path[:] = _primed_path
try:
    import fastapi as _fastapi_pypi  # noqa: F401 — lock real FastAPI into sys.modules first
finally:
    sys.path[:] = _saved_path

sys.path.insert(0, str(_FASTAPI_DIR.resolve()))

_spec = importlib.util.spec_from_file_location("askpatio_fastapi_backend", _BACKEND_MAIN)
if _spec is None or _spec.loader is None:
    raise RuntimeError(f"Cannot load backend from {_BACKEND_MAIN}")
_mod = importlib.util.module_from_spec(_spec)
sys.modules["askpatio_fastapi_backend"] = _mod
_spec.loader.exec_module(_mod)
app = _mod.app
