import React, { useRef } from "react";
import {
  Button,
  useDisclosure,
  useColorMode,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialog,
} from "@chakra-ui/core";

export default function DeletePracticeButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const cancelRef = useRef();
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  return (
    <>
      <Button
        bg="black"
        color={color[colorMode]}
        variantColor="red"
        ref={btnRef}
        onClick={onOpen}
        isDisabled={props.isLoadingProp}
        variantColor="red"
      >
        {props.buttonDescription}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.buttonHeader}
          </AlertDialogHeader>

          <AlertDialogBody>{props.buttonMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button variantColor="red" onClick={props.onClickFunc} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
