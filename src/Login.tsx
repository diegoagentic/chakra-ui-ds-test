import {
    Box,
    Button,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Icon,
    Image,
    Stack,
    Divider,
    Link,
    useColorModeValue,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { FaBuilding } from 'react-icons/fa'
import { useState } from 'react'

const organizations = [
    { name: 'Strata Manufacturing HQ', users: 245, type: 'Primary workspace' },
    { name: 'Strata Sales Division', users: 120, type: 'Regional hub' },
    { name: 'Strata Logistics Link', users: 85, type: 'Distribution center' }
]

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [show, setShow] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [selectedOrg, setSelectedOrg] = useState(organizations[0])
    const handleClick = () => setShow(!show)

    const handleAction = () => {
        onLoginSuccess()
    }

    // Color Mode Values
    const bgLeft = useColorModeValue('white', 'gray.900')
    const textPrimary = useColorModeValue('gray.900', 'white')
    const textSecondary = useColorModeValue('gray.600', 'gray.400')

    const btnPrimaryBg = useColorModeValue('gray.900', 'white')
    const btnPrimaryColor = useColorModeValue('white', 'gray.900')
    const btnSecondaryBorder = useColorModeValue('gray.300', 'whiteAlpha.400')

    return (
        <Flex minH="100vh" direction={{ base: 'column', lg: 'row' }}>
            {/* Left Side - Branding (Responsive) */}
            <Box
                w={{ base: 'full', lg: '50%' }}
                bg={bgLeft}
                color={textPrimary}
                p={{ base: 8, lg: 20 }}
                position="relative"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                transition="background 0.3s"
            >
                {/* Decorative Subtle Gradient */}
                <Box
                    position="absolute"
                    inset={0}
                    bgGradient={useColorModeValue("linear(to-br, gray.50, gray.100)", "linear(to-br, gray.800, gray.900)")}
                    opacity={0.5}
                    zIndex={0}
                />

                <Stack spacing={8} position="relative" zIndex={1} maxW="lg">
                    <Flex align="center" gap={3} mb={8}>
                        <Image src="/logo-on-light.jpg" alt="Strata" h={10} display={useColorModeValue('block', 'none')} />
                        <Image src="/logo-on-dark.jpg" alt="Strata" h={10} display={useColorModeValue('none', 'block')} />
                    </Flex>

                    <Heading as="h1" size="3xl" lineHeight="tight">
                        Transform your workflow with Strata
                    </Heading>

                    <Text fontSize="lg" color={textSecondary} lineHeight="tall">
                        At Strata, we provide comprehensive solutions for contract dealers and manufacturers, combining sales enablement, financial services, and expert consulting with cutting-edge technology to optimize operations and drive business growth.
                    </Text>

                    <Stack direction="row" spacing={4} pt={4}>
                        <Button
                            bg={btnPrimaryBg}
                            color={btnPrimaryColor}
                            rounded="full"
                            px={8}
                            py={6}
                            _hover={{ opacity: 0.9 }}
                            rightIcon={<ArrowForwardIcon boxSize={4} />}
                        >
                            Talk to an Expert
                        </Button>
                        <Button
                            variant="outline"
                            color={textPrimary}
                            rounded="full"
                            px={8}
                            py={6}
                            borderColor={btnSecondaryBorder}
                            _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
                        >
                            Browse all Services
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* Right Side - Form */}
            <Flex
                w={{ base: 'full', lg: '50%' }}
                align="center"
                justify="center"
                p={8}
                bgImage="url('/login-bg.jpg')"
                bgSize="cover"
                bgPosition="center"
                position="relative"
            >
                {/* Dark Overlay */}
                <Box position="absolute" inset={0} bg="blackAlpha.600" backdropFilter="blur(2px)" zIndex={0} />

                <Box w="full" maxW="440px" zIndex={1} bg="blackAlpha.600" backdropFilter="blur(20px)" p={8} borderRadius="2xl" border="1px solid" borderColor="whiteAlpha.100" boxShadow="2xl">
                    <Stack spacing={6}>
                        <Stack spacing={2}>
                            <Heading size="lg" color="white">
                                {isRegistering ? 'Create Account' : 'Welcome Back!'}
                            </Heading>
                            <Flex direction={{ base: 'column', sm: 'row' }} gap={1} fontSize="sm" color="gray.400">
                                <Text>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</Text>
                                <Link
                                    fontWeight="bold"
                                    color="white"
                                    _hover={{ textDecoration: 'underline' }}
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {isRegistering ? 'Login now' : 'Create a new account now,'}
                                    {!isRegistering && <Text as="span" fontWeight="normal" color="gray.400"> it's FREE! Takes less than a minute.</Text>}
                                </Link>
                            </Flex>
                        </Stack>

                        <Stack spacing={5}>
                            {!isRegistering && (
                                <>
                                    <Button
                                        w="full"
                                        h={12}
                                        variant="outline"
                                        borderColor="whiteAlpha.200"
                                        color="white"
                                        fontWeight="medium"
                                        _hover={{ bg: 'whiteAlpha.100' }}
                                        onClick={handleAction}
                                        leftIcon={<Icon viewBox="0 0 21 21" boxSize={5}><path fill="#f25022" d="M1 1h9v9H1z" /><path fill="#7fba00" d="M11 1h9v9h-9z" /><path fill="#00a4ef" d="M1 11h9v9H1z" /><path fill="#ffb900" d="M11 11h9v9h-9z" /></Icon>}
                                    >
                                        Login with Microsoft
                                    </Button>

                                    <Flex align="center">
                                        <Divider borderColor="whiteAlpha.200" />
                                        <Text px={3} fontSize="xs" fontWeight="medium" textTransform="uppercase" color="gray.500" whiteSpace="nowrap">
                                            Or login with email
                                        </Text>
                                        <Divider borderColor="whiteAlpha.200" />
                                    </Flex>
                                </>
                            )}

                            <Stack spacing={4}>
                                {isRegistering && (
                                    <FormControl>
                                        <FormLabel color="gray.300" fontSize="sm">Select Organization</FormLabel>
                                        <Menu matchWidth>
                                            <MenuButton
                                                as={Button}
                                                w="full"
                                                h="auto"
                                                p={3}
                                                borderRadius="xl"
                                                bg="whiteAlpha.100"
                                                border="1px solid"
                                                borderColor="whiteAlpha.200"
                                                _hover={{ bg: 'whiteAlpha.200' }}
                                                _active={{ bg: 'whiteAlpha.200' }}
                                                textAlign="left"
                                            >
                                                <Flex align="center" gap={3}>
                                                    <Flex h={10} w={10} bg="whiteAlpha.100" borderRadius="lg" align="center" justify="center">
                                                        <Icon as={FaBuilding} boxSize={5} color="gray.200" />
                                                    </Flex>
                                                    <Box flex="1" overflow="hidden">
                                                        <Flex align="center" gap={2}>
                                                            <Text fontWeight="semibold" fontSize="sm" color="white" isTruncated>{selectedOrg.name}</Text>
                                                            <Box w={2} h={2} borderRadius="full" bg="green.400" flexShrink={0} />
                                                        </Flex>
                                                        <Text fontSize="xs" color="gray.400" isTruncated>{selectedOrg.type} • {selectedOrg.users} users</Text>
                                                    </Box>
                                                    <Icon as={ChevronDownIcon} boxSize={5} color="gray.400" />
                                                </Flex>
                                            </MenuButton>
                                            <MenuList bg="gray.800" borderColor="whiteAlpha.200" p={2}>
                                                {organizations.map((org, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        bg="transparent"
                                                        _hover={{ bg: 'whiteAlpha.100' }}
                                                        borderRadius="md"
                                                        onClick={() => setSelectedOrg(org)}
                                                    >
                                                        <Flex align="center" gap={3} w="full">
                                                            <Flex h={8} w={8} bg="whiteAlpha.100" borderRadius="md" align="center" justify="center">
                                                                <Icon as={FaBuilding} boxSize={3} color="gray.400" />
                                                            </Flex>
                                                            <Box>
                                                                <Text fontWeight="medium" fontSize="sm" color="white">{org.name}</Text>
                                                                <Text fontSize="xs" color="gray.500">{org.type}</Text>
                                                            </Box>
                                                        </Flex>
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    </FormControl>
                                )}

                                <FormControl>
                                    <FormLabel color="gray.300" fontSize="sm">{isRegistering ? 'Work Email' : 'Email'}</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        defaultValue="hisalim.ux@gmail.com"
                                        size="lg"
                                        bg="whiteAlpha.50"
                                        border="1px solid"
                                        borderColor="whiteAlpha.100"
                                        color="white"
                                        _placeholder={{ color: 'gray.500' }}
                                        _focus={{ borderColor: 'whiteAlpha.400', bg: 'whiteAlpha.100' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel color="gray.300" fontSize="sm">Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            pr="4.5rem"
                                            type={show ? 'text' : 'password'}
                                            placeholder="Password"
                                            defaultValue="Password123!"
                                            bg="whiteAlpha.50"
                                            border="1px solid"
                                            borderColor="whiteAlpha.100"
                                            color="white"
                                            _placeholder={{ color: 'gray.500' }}
                                            _focus={{ borderColor: 'whiteAlpha.400', bg: 'whiteAlpha.100' }}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost" color="gray.400" _hover={{ bg: 'whiteAlpha.100', color: 'white' }}>
                                                {show ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                {isRegistering && (
                                    <Box bg="rgba(34, 197, 94, 0.1)" p={4} borderRadius="lg" border="1px solid" borderColor="rgba(34, 197, 94, 0.2)">
                                        <Flex gap={2} alignItems="flex-start">
                                            <Icon viewBox="0 0 24 24" color="green.400" mt="3px" boxSize={4} fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </Icon>
                                            <Box>
                                                <Text fontSize="sm" fontWeight="medium" color="green.200" mb={1}>Password requirements met:</Text>
                                                <List spacing={1} color="green.300" fontSize="xs">
                                                    <ListItem display="flex" alignItems="center" gap={2}>
                                                        <Icon viewBox="0 0 24 24" color="green.400" boxSize={3} fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></Icon> Minimum 8 characters
                                                    </ListItem>
                                                    <ListItem display="flex" alignItems="center" gap={2}>
                                                        <Icon viewBox="0 0 24 24" color="green.400" boxSize={3} fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></Icon> At least one uppercase letter
                                                    </ListItem>
                                                    <ListItem display="flex" alignItems="center" gap={2}>
                                                        <Icon viewBox="0 0 24 24" color="green.400" boxSize={3} fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></Icon> At least one number
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </Flex>
                                    </Box>
                                )}
                            </Stack>

                            <Button
                                size="lg"
                                bg="white"
                                color="gray.900"
                                _hover={{ bg: 'gray.200' }}
                                onClick={handleAction}
                                shadow="lg"
                            >
                                {isRegistering ? 'Create Account' : 'Login Now'}
                            </Button>

                            {!isRegistering && (
                                <Box textAlign="center">
                                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                                        Forget password <Link color="gray.300" textDecoration="underline" textUnderlineOffset={2} _hover={{ color: 'white' }} onClick={() => { }}>Click here</Link>
                                    </Text>
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    )
}
