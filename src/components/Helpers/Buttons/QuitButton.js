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

export default function QuitButton(props) {
  const { isOpen, onToggle } = useDisclosure();
  const btnRef = useRef();
  const cancelRef = useRef();
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const onOpenOverride = () => {
    onToggle();
    if (props.toggleTimerFunc) {
      //if the component is called from Timer component
      console.log("testing onOpen in IF");

      props.toggleTimerFunc();
    }
  };

  const onCloseOverride = () => {
    onToggle();
    if (props.toggleTimerFunc) {
      //if the component is called from Timer component
      console.log("testing onClose in IF");
      props.toggleTimerFunc();
    }
  };

  return (
    <>
      <Button
        marginLeft={3}
        size="lg"
        bg="black"
        color={color[colorMode]}
        variantColor="red"
        ref={btnRef}
        onClick={onOpenOverride}
      >
        {props.buttonDescription}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseOverride}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.buttonHeader}
          </AlertDialogHeader>

          <AlertDialogBody>{props.buttonMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseOverride}>
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
