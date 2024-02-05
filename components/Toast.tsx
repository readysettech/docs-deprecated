import React from "react";
import { Toaster, toast as ToastPrimitive } from "sonner";

const toastError = (text: string) => {
    ToastPrimitive(
        <div className={"text-sm flex w-full"}>
            <div
                className={
                    "rounded-full min-w-[20px] h-[20px] bg-gradient-to-b from-error-500 to-error-700 text-white flex items-center justify-center mr-2"
                }
            >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.9522 16.3536L10.2152 5.85658C10.9531 4.38481 13.0539 4.3852 13.7913 5.85723L19.0495 16.3543C19.7156 17.6841 18.7487 19.25 17.2613 19.25H6.74007C5.25234 19.25 4.2854 17.6835 4.9522 16.3536Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10V12" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
            </div>
            {text}
        </div>,
        {
            duration: 5500,
        }
    );
};

const toastSuccess = (text: string) => {
    ToastPrimitive(
        <div className={"text-sm flex w-full"}>
            <div
                className={
                    "rounded-full min-w-[20px] h-[20px] bg-gradient-to-b from-green-500 to-green-700 text-white flex items-center justify-center mr-2"
                }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>
            {text}
        </div>
    );
};

const toastDefault = (text: string) => {
    ToastPrimitive(
        <div className={"text-sm flex w-full"}>
            <div
                className={
                    "rounded-full min-w-[20px] h-[20px] bg-gradient-to-b from-neutral-500 to-neutral-700  flex items-center justify-center mr-2"
                }
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V15" />
                    <circle cx="12" cy="9" r="1" fill="currentColor" />
                    <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                </svg>

            </div>
            {text}
        </div>
    );
};

const toast = Object.assign(toastDefault, {
    error: toastError,
    success: toastSuccess,
});

export { Toaster, toast };
