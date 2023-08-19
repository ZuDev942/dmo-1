import { onBeforeUnmount } from "vue";
import { TinyEmitter } from "tiny-emitter";

const eventEmitter = new TinyEmitter();

export default function useEventBus() {
  const eventHandlers: { event: string; handler: (...args: any[]) => void }[] =
    [];

  onBeforeUnmount(() => {
    eventHandlers.forEach((eventHandler) => {
      eventEmitter.off(eventHandler.event, eventHandler.handler);
    });
  });

  return {
    onEvent(event: string, handler: (...args: any[]) => void) {
      eventHandlers.push({ event, handler });
      eventEmitter.on(event, handler);
    },
    emitEvent(event: string, payload: any) {
      eventEmitter.emit(event, payload);
    },
  };
}
