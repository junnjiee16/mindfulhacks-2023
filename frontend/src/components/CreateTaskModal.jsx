import fs from 'fs';
import { useState, useRef } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { textToEmoji } from '../apiCalls'
import tasksData from '../todoDatabase.json'; // Import the JSON data

export function CreateTaskModal() {
    // const nameInputRef = useRef(null);
    // const numberInputRef = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskName, setTaskName] = useState("");
    // in minutes
    const [taskTimeLimit, setTaskTimeLimit] = useState(15);

    const handleTextChange = (input) => setTaskName(input.target.value);

    const predictEmoji = async () => {
        console.log('Calling predictEmoji');
        const res = await textToEmoji(title);
        console.log(res);
    }
    const handleNumberChange = (newValue) => {
        setTaskTimeLimit(newValue);
    };

    // function:
    // import json as js object
    // add new task to js object
    // save js object to json file
    function addNewObject(newObj) {
        var newTasksData = tasksData;
        newTasksData.push(newObj);
        var jsonStr = JSON.stringify(newTasksData);
        fs.writeFileSync(`../todoDatabase.json`, jsonStr);
    }

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Task!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name of Task</FormLabel>
                            <Input
                                onChange={e => { handleTextChange(e); }}
                            />
                            {/* onChange={e => { handleTextChange(e); predictEmoji() }} */}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Minutes</FormLabel>
                            <NumberInput step={5} defaultValue={15} min={10} max={600}
                                onChange={(e) => {
                                    handleNumberChange(e);
                                }}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Time Limit</FormLabel>
                            <Input />
                        </FormControl> */}
                    </ModalBody>

                    <ModalFooter>
                        
                        <Button colorScheme='blue' onClick={() => {
                          
                            console.log(`Name of task: ${taskName}`);
                            console.log(`Minutes: ${taskTimeLimit}`);
                              // addNewObject({ task: taskName, timeLimit: taskTimeLimit })
                            window.location.reload();

                        }} >Create Task</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}
