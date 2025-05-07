import React from 'react';
import styles from '../styles/components/Toast.module.css';
import ReactDOM from 'react-dom/client';

interface ToastOptions {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  options: ToastOptions;
}

class Toast {
  private static instance: Toast;
  private container: HTMLDivElement | null = null;
  private root: ReactDOM.Root | null = null;
  private toasts: ToastState[] = [];

  private constructor() {
    this.createContainer();
  }

  private createContainer() {
    if (typeof document !== 'undefined') {
      this.container = document.createElement('div');
      this.container.className = styles.toastContainer;
      document.body.appendChild(this.container);
      this.root = ReactDOM.createRoot(this.container);
    }
  }

  public static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  private show(message: string, type: ToastState['type'], options: ToastOptions = {}) {
    const defaultOptions: ToastOptions = {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    const toast: ToastState = {
      message,
      type,
      options: { ...defaultOptions, ...options },
    };

    this.toasts.push(toast);
    this.render();

    if (toast.options.autoClose) {
      setTimeout(() => {
        this.removeToast(this.toasts.indexOf(toast));
      }, toast.options.autoClose);
    }
  }

  private removeToast(index: number) {
    this.toasts.splice(index, 1);
    this.render();
  }

  private render() {
    if (!this.container || !this.root) return;

    const toastElements = this.toasts.map((toast, index) => {
      const toastClass = [
        styles.toast,
        styles[toast.type],
        styles[toast.options.position || 'top-right']
      ].filter(Boolean).join(' ');

      return (
        <div
          key={index}
          className={toastClass}
          onClick={() => toast.options.closeOnClick && this.removeToast(index)}
          role="alert"
        >
          {toast.message}
          {!toast.options.hideProgressBar && (
            <div className={styles.progressBar} />
          )}
        </div>
      );
    });

    this.root.render(<>{toastElements}</>);
  }

  public success(message: string, options?: ToastOptions) {
    this.show(message, 'success', options);
  }

  public error(message: string, options?: ToastOptions) {
    this.show(message, 'error', options);
  }

  public warning(message: string, options?: ToastOptions) {
    this.show(message, 'warning', options);
  }

  public info(message: string, options?: ToastOptions) {
    this.show(message, 'info', options);
  }
}

const toast = Toast.getInstance();
export default toast;