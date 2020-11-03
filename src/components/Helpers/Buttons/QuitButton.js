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
    props.toggleTimerFunc();
  };

  const onCloseOverride = () => {
    onToggle();
    props.toggleTimerFunc();
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
      {/* You can swap the `Scale` with `SlideIn` to see a different transition */}
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
