import React from 'react';
import {
  Heading,
  Icon,
  ButtonText,
  Button,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogHeader,
  CloseIcon,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogCloseButton,
} from '@gluestack-ui/themed';

const Dialog = ({
  isOpen,
  setIsOpen,
  title,
  isNegative,
  confirmButtonText,
  handleConfirm,
  children,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>{title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>{children}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={handleClose}
            mr="$3">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            action={isNegative ? 'negative' : undefined}
            onPress={handleConfirm}>
            <ButtonText>{confirmButtonText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Dialog;
