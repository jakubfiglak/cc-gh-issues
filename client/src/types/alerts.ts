export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  msg: string;
  type: AlertType;
  isVisible: boolean;
}

export interface State {
  alerts: Alert[];
  setAlert: (msg: string, type: AlertType, timeout?: number) => void;
}

export type Action =
  | { type: 'SET_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string }
  | { type: 'HIDE_ALERT'; payload: string };
