"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ModalConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
};

type GlobalConfirmationModalContextType = {
  showConfirmationModal: (config: Omit<ModalConfig, "isOpen">) => void;
  closeModal: () => void;
};

const GlobalModalContext = createContext<
  GlobalConfirmationModalContextType | undefined
>(undefined);

const defaultState: ModalConfig = {
  isOpen: false,
  title: "",
  description: "",
  onConfirm: () => {},
};

export function GlobalConfirmationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(defaultState);

  const showConfirmationModal = (config: Omit<ModalConfig, "isOpen">) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig(defaultState);
  };

  return (
    <GlobalModalContext.Provider value={{ showConfirmationModal, closeModal }}>
      {children}
      {modalConfig.isOpen ? (
        <Dialog open={modalConfig.isOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogTitle>{modalConfig.title}</DialogTitle>
            <DialogDescription>{modalConfig.description}</DialogDescription>
            <DialogFooter className="mt-4 flex justify-end gap-4">
              <Button variant={"outline"} onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant={"default"}
                onClick={async () => {
                  closeModal();
                  await modalConfig.onConfirm();
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </GlobalModalContext.Provider>
  );
}

export const useConfirmationModal = () => {
  const context = useContext(GlobalModalContext);
  if (!context) {
    throw new Error("useGlobalModal must be used within a GlobalModalProvider");
  }
  return context;
};
