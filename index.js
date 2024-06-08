AbortSignal.any || (AbortSignal.any = function any() {
  const controller = new AbortController();

  const cleanups: Array<() => void> = [];
  for (const signal of signals) {
    const abort = () => {
      controller.abort(signal.reason);
      cleanups.forEach((c) => c());
    }

    if (signal.aborted) {
      abort();
      break;
    }

    signal.addEventListener('abort', listener);
    cleanups.push(() => signal.removeEventListener('abort', abort));
  }

  return controller.signal;
});
