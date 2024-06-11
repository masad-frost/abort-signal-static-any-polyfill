AbortSignal.any || (AbortSignal.any = function any(signals) {
  const controller = new AbortController();

  const cleanups = [];
  for (const signal of signals) {
    const abort = () => {
      controller.abort(signal.reason);
      cleanups.forEach((c) => c());
    }

    if (signal.aborted) {
      abort();
      break;
    }

    signal.addEventListener('abort', abort);
    cleanups.push(() => signal.removeEventListener('abort', abort));
  }

  return controller.signal;
});
