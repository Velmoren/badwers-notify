export type Position =
  | 'right-top'
  | 'left-top'
  | 'center-top'
  | 'right-bottom'
  | 'left-bottom'
  | 'center-bottom';

export type NotifyType = 'info' | 'success' | 'attention' | 'warning';

export interface NotifyOptions {
  message: string;
  title?: string;
  type?: NotifyType;
  position?: Position;
  closable?: boolean;
  autoclose?: boolean;
  duration?: number;
  icon?: string;
  customClass?: string;
  closeAriaLabel?: string;
}

export interface TypeStyle {
  bg: string;
  color: string;
  iconColor: string;
}

export interface BadwersNotifyConfig {
  position?: Position;
  closable?: boolean;
  autoclose?: boolean;
  duration?: number;
  maxStack?: number;
  animationDuration?: number;
  typeStyles?: Partial<Record<NotifyType, TypeStyle>>;
  icons?: Partial<Record<NotifyType, string>>;
  closeAriaLabel?: string;
  font?: string;
}

export const VALID_POSITIONS: readonly Position[] = [
  'right-top',
  'left-top',
  'center-top',
  'right-bottom',
  'left-bottom',
  'center-bottom',
] as const;

export const VALID_TYPES: readonly NotifyType[] = [
  'info',
  'success',
  'attention',
  'warning',
] as const;
