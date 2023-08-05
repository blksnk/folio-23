// @ts-nocheck

type func = () => void;

export type Vector2 = { x: number; y: number };

type onTouchFunc = (touches: Vector2[]) => void;

export type VectorArgFunc = (vec: Vector2, delta?: Vector2) => void;

export type onMoveFn = (
  vec: Vector2,
  delta: Vector2,
  fromTrackpad?: boolean
) => void;

type EventListener = (e: Event) => void;
export interface GestureHandlerOptions {
  onStart?: VectorArgFunc;
  onMove?: onMoveFn;
  onTouch?: onTouchFunc;
  onPinch?: VectorArgFunc;
  onWheel?: VectorArgFunc;
  onWheel_Native?: VectorArgFunc;
  onEnd?: func;
  target?: HTMLElement;
  preventDefault?: boolean;
}

class GestureHandler {
  onStart?: VectorArgFunc;
  onMove?: onMoveFn;
  onTouch?: onTouchFunc;
  onPinch?: VectorArgFunc;
  onWheel?: VectorArgFunc;
  onWheel_Native?: VectorArgFunc;
  onEnd?: func;
  target: (Window & typeof globalThis) | HTMLElement = window;
  preventDefault = true;
  _onMouseDown_bound: EventListener;
  _onMouseUp_bound: EventListener;
  _onMouseMove_bound: EventListener;
  _onTouchStart_bound: EventListener;
  _onTouchEnd_bound: EventListener;
  _onTouchMove_bound: EventListener;
  _onTouchCancel_bound: EventListener;
  _onWheel_bound: EventListener;

  private touches: Touch[] = [];
  private touchPositions: Vector2[] = [];
  private oldTouches: Touch[] = [];
  private mousePos: Vector2 = ({ x: 0, y: 0 });
  private pinching = false;
  private touching = false;
  private multitouch = false;
  public isTrackpad = false;

  constructor(options: GestureHandlerOptions) {
    if (options.target) {
      this.target = options.target;
    }
    if (options.preventDefault) {
      this.preventDefault = options.preventDefault;
    }
    if (options.onStart) {
      this.onStart = options.onStart;
    }
    if (options.onMove) {
      this.onMove = options.onMove;
    }
    if (options.onEnd) {
      this.onEnd = options.onEnd;
    }
    if (options.onTouch) {
      this.onTouch = options.onTouch;
    }
    if (options.onWheel) {
      this.onWheel = options.onWheel;
    }
    if (options.onWheel) {
      this.onWheel_Native = options.onWheel_Native;
    }
    if (options.onPinch) {
      this.onPinch = options.onPinch;
    }

    this._onMouseDown_bound = this._onMouseDown.bind(this);
    this._onMouseUp_bound = this._onMouseUp.bind(this);
    this._onMouseMove_bound = this._onMouseMove.bind(this);
    this._onTouchStart_bound = this._onTouchStart.bind(this);
    this._onTouchEnd_bound = this._onTouchEnd.bind(this);
    this._onTouchCancel_bound = this._onTouchCancel.bind(this);
    this._onTouchMove_bound = this._onTouchMove.bind(this);
    this._onWheel_bound = this._onWheel.bind(this);

    this.init();
  }

  init() {
    this.target.addEventListener('mousedown', this._onMouseDown_bound);
    this.target.addEventListener('mouseup', this._onMouseUp_bound);
    this.target.addEventListener('mousemove', this._onMouseMove_bound);

    this.target.addEventListener('touchstart', this._onTouchStart_bound, {
      passive: false,
    });
    this.target.addEventListener('touchend', this._onTouchEnd_bound, {
      passive: false,
    });
    this.target.addEventListener('touchcancel', this._onTouchCancel_bound, {
      passive: false,
    });
    this.target.addEventListener('touchleave', this._onTouchEnd_bound, {
      passive: false,
    });
    this.target.addEventListener('touchmove', this._onTouchMove_bound, {
      passive: false,
    });
    this.target.addEventListener('wheel', this._onWheel_bound, {
      passive: false,
    })
  }

  destroy() {
    this.target.removeEventListener('mousedown', this._onMouseDown_bound);
    this.target.removeEventListener('mouseup', this._onMouseUp_bound);
    this.target.removeEventListener('mousemove', this._onMouseMove_bound);

    this.target.removeEventListener('touchstart', this._onTouchStart_bound);
    this.target.removeEventListener('touchend', this._onTouchEnd_bound);
    this.target.removeEventListener('touchcancel', this._onTouchCancel_bound);
    this.target.removeEventListener('touchleave', this._onTouchEnd_bound);
    this.target.removeEventListener('touchmove', this._onTouchMove_bound);

  }

  private prevent(e: Event) {
    if (this.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  _onMouseDown(e: Event) {
    this.mousePos.x = (e as MouseEvent).clientX;
    this.mousePos.y = (e as MouseEvent).clientY;
    if (this.onStart) this.onStart(this.mousePos);
  }

  _onMouseUp() {
    if (this.onEnd) this.onEnd();
  }

  _onMouseMove(e: Event) {
    this.prevent(e);
    if (this.onMove) {
      const x = (e as MouseEvent).clientX;
      const y = (e as MouseEvent).clientY;
      const delta = {
        x: x - this.mousePos.x,
        y: y - this.mousePos.y,
      };
      this.mousePos.x = x;
      this.mousePos.y = y;
      this.onMove(this.mousePos, delta);
    }
  }

  private getTouchPositions(touches: Touch[]): Vector2[] {
    return touches.map((touch: Touch) => {
      const { screenX, screenY } = touch;
      return { x: screenX, y: screenY };
    });
  }

  private removeTouches(e: Event) {
    const touches = (e as TouchEvent).changedTouches;
    for (let i = 0; i < touches.length; i++) {
      this.touches.splice(i, 1);
    }
  }

  private handleMultitouch() {
    if (this.touches.length >= 2) {
      this.handlePinch();
    }
  }

  private handlePinch() {
    // calc diffs between touch positions
    if (this.onPinch) {
      const oldPositions = this.getTouchPositions(this.oldTouches);
      const oldDiff = {
        x: oldPositions[0].x - oldPositions[1].x,
        y: oldPositions[0].y - oldPositions[1].y,
      };
      const newDiff = {
        x: this.touchPositions[0].x - this.touchPositions[1].x,
        y: this.touchPositions[0].y - this.touchPositions[1].y,
      };

      const deltas = {
        x: (newDiff.x - oldDiff.x) * 0.5,
        y: (newDiff.y - oldDiff.y) * 0.5,
      };

      // const pinchDelta = largestAbsolute(oldDiff.x, oldDiff.y) - largestAbsolute(newDiff.x, newDiff.y);
      this.onPinch(deltas);
    }
  }

  _onTouchStart(e: Event) {
    // this.prevent(e);
    const E = e as TouchEvent;
    this.oldTouches = [...this.touches];
    this.touches = [...E.touches];
    this.touchPositions = this.getTouchPositions(this.touches);
    this.multitouch = this.touches.length > 1;
    if (this.onStart && !this.touching) {
      this.touching = true;
      this.onStart(this.touchPositions[0]);
    }

    if (this.onTouch) this.onTouch(this.touchPositions);
  }

  _onTouchEnd(e: Event) {
    // this.prevent(e);
    if (this.onEnd) {
      const E = e as TouchEvent;
      this.oldTouches = [...this.touches];
      this.removeTouches(e);
      // @ts-ignore
      this.touches = [...E.touches];
      this.touchPositions = this.getTouchPositions(this.touches);
      this.multitouch = this.touches.length > 1;
      this.touching = this.touches.length > 0;
      this.onEnd();
    }
  }

  _onTouchCancel(e: Event) {
    this.prevent(e);
    this.removeTouches(e);
    this.touchPositions = [];

    if (this.onEnd) this.onEnd();
  }

  _onTouchMove(e: Event) {
    const touchEvent = e as TouchEvent;
    this.prevent(e);
    this.oldTouches = this.touches;

    this.touches = [...touchEvent.targetTouches];
    // handle pinch
    this.multitouch = this.touches.length > 1;
    this.touchPositions = this.getTouchPositions(this.touches);
    if (this.multitouch) {
      this.prevent(e);
      e.preventDefault();
      this.handleMultitouch();
    }
    if (this.onTouch) {
      this.onTouch(this.touchPositions);
    }
  }

  _onWheel(e: Event) {
    this.detectTrackPad(e);
    const E = e as WheelEvent;
    const { deltaX, deltaY } = E;
    const deltaVec = { x: deltaX, y: deltaY };
    if (this.onWheel_Native) this.onWheel_Native(deltaVec);
    // change zoom
    e.preventDefault();
    if (this.isTrackpad) {
      if (E.ctrlKey && this.onWheel) {
        this.onWheel(deltaVec);
      } else if (this.onMove) {
        this.onMove(this.mousePos, { x: -deltaVec.x, y: -deltaVec.y }, true);
      }
    } else if (this.onWheel) this.onWheel(deltaVec);
  }

  detectTrackPad(e: any) {
    if (e.wheelDeltaY) {
      if (e.wheelDeltaY === e.deltaY * -3) {
        this.isTrackpad = true;
      }
    } else if (e.deltaMode === 0) {
      this.isTrackpad = true;
    } else {
      this.isTrackpad = false;
    }
  }
}

export default GestureHandler;