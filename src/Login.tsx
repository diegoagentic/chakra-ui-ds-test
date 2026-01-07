import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    InputGroup,
    InputRightElement,
    List,
    ListItem,
    ListIcon,
    Flex,
    VStack,
    HStack
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, InfoIcon, LockIcon } from '@chakra-ui/icons'
import { useState } from 'react'


export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={4}>
            <Card maxW="480px" w="full" boxShadow="xl">
                <CardHeader textAlign="center" pb={2}>
                    <Flex justify="center" align="center" h="16" w="32" bg="gray.200" mx="auto" mb={4}>
                        <Text fontSize="xs" fontWeight="semibold" letterSpacing="widest" textTransform="uppercase" color="gray.400">Client Logo</Text>
                    </Flex>
                    <Heading size="lg" fontWeight="normal">Sign In</Heading>
                    <Text color="gray.500">Access your workspace</Text>
                </CardHeader>
                <CardBody>
                    <VStack spacing={5}>
                        <Alert status="error" variant="subtle" flexDirection="column" alignItems="start" p={3} bg="red.50" borderColor="red.100" borderWidth="1px" rounded="md">
                            <HStack>
                                <AlertIcon color="red.500" boxSize={4} />
                                <AlertTitle fontSize="sm" fontWeight="bold" color="gray.900">Authentication Failed for selected Organization</AlertTitle>
                            </HStack>
                            <AlertDescription fontSize="xs" color="gray.600" ml={6} mt={1}>
                                Please check your credentials and organization selection
                            </AlertDescription>
                        </Alert>

                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Select Organization</FormLabel>
                            <Select placeholder="Choose your workspace..." size="lg" fontSize="md">
                                <option value="hq">Strata Manufacturing HQ</option>
                                <option value="west">Strata West Coast Division</option>
                                <option value="eu">Strata Europe Operations</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Work Email</FormLabel>
                            <Input type="email" defaultValue="maria.gonzalez@estrata.com" size="lg" />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium">Password</FormLabel>
                            <InputGroup size="lg">
                                <Input
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    defaultValue="SecurePass2025!"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
                                        {show ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Box bg="gray.50" p={3} rounded="md" border="1px" borderColor="gray.100" w="full">
                            <HStack fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>
                                <InfoIcon boxSize={3} /> <Text>Password must contain:</Text>
                            </HStack>
                            <List spacing={1} pl={1}>
                                {['Minimum 8 characters', 'At least one uppercase letter', 'At least one number', 'At least one special character (!@#$%)'].map((req, i) => (
                                    <ListItem key={i} fontSize="10px" color="gray.500" display="flex" alignItems="center">
                                        <ListIcon as="div" w={1} h={1} rounded="full" bg="gray.400" mr={2} />
                                        {req}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Button onClick={onLoginSuccess} w="full" bg="gray.900" color="white" _hover={{ bg: 'gray.800' }} size="lg">
                            Log In
                        </Button>

                        <Button variant="link" size="sm" color="gray.500" fontWeight="normal">
                            Forgot Password?
                        </Button>

                        <Flex w="full" pt={4} mt={2} borderTop="1px" borderColor="gray.100" justify="space-between" align="center" fontSize="xs" color="gray.400">
                            <HStack spacing={3}>
                                <Text _hover={{ color: 'gray.600', cursor: 'pointer' }}>Need access?</Text>
                                <Text _hover={{ color: 'gray.600', cursor: 'pointer' }}>Contact Admin</Text>
                            </HStack>
                            <HStack spacing={1}>
                                <LockIcon boxSize={3} /> <Text>Secure Login</Text>
                            </HStack>
                        </Flex>
                    </VStack>
                </CardBody>
            </Card>
        </Flex>
    )
}
