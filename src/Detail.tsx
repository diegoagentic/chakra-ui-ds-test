import {
    Box, Flex, Grid, Heading, Text, Button, Input, InputGroup, InputLeftElement,
    IconButton, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Card, CardBody, VStack, Divider, SimpleGrid,
    Progress, Icon, Checkbox, Tag, useColorModeValue, Collapse,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import {
    SearchIcon, ChevronRightIcon, ChevronDownIcon, AddIcon,
    CopyIcon, EmailIcon, ViewIcon, CheckCircleIcon,
    CloseIcon, WarningIcon, DownloadIcon, AttachmentIcon, MoonIcon, SunIcon
} from '@chakra-ui/icons'
import { useState } from 'react'
import { useColorMode } from '@chakra-ui/react'

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", colorScheme: 'yellow' },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock", colorScheme: 'red' },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock", colorScheme: 'yellow' },
]

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true
    })

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const { colorMode, toggleColorMode } = useColorMode()
    const ThemeIcon = colorMode === 'light' ? MoonIcon : SunIcon
    const { isOpen, onOpen, onClose } = useDisclosure()

    const bgMain = useColorModeValue('gray.50', 'gray.900')
    const bgCard = useColorModeValue('white', 'gray.800')
    const borderColor = useColorModeValue('gray.200', 'gray.700')
    const textColorMuted = useColorModeValue('gray.500', 'gray.400')
    const textColorMain = useColorModeValue('gray.900', 'white')
    const bgButton = useColorModeValue('gray.900', 'white')
    const colorButton = useColorModeValue('white', 'gray.900')
    const bgHoverButton = useColorModeValue('gray.800', 'gray.100')
    const bgStepperLines = useColorModeValue('gray.200', 'gray.700')
    const bgSelected = useColorModeValue('gray.50', 'gray.700')
    const checkboxBorder = useColorModeValue('gray.300', 'gray.500')
    const bgIcon = useColorModeValue('gray.100', 'gray.600')
    const colorIcon = useColorModeValue('gray.400', 'gray.300')

    // Lifecycle & AI Variables
    const lifecycleIconBg = useColorModeValue('gray.900', 'white')
    const lifecycleIconColor = useColorModeValue('white', 'gray.900')
    const lifecycleBorderColor = useColorModeValue('gray.900', 'white')
    const bgAiBox = useColorModeValue('gray.50', 'gray.900') // Background container
    const bgAiCard = useColorModeValue('white', 'gray.800') // Card overlay
    const warningIconColor = useColorModeValue('gray.900', 'white')
    const poButtonBg = useColorModeValue('gray.900', 'white')
    const poButtonColor = useColorModeValue('white', 'gray.900')
    const poButtonHover = useColorModeValue('gray.800', 'gray.200')

    return (
        <Flex direction="column" minH="100vh" bg={bgMain}>
            {/* Header */}
            <Flex h="16" bg={bgCard} borderBottom="1px" borderColor={borderColor} align="center" justify="space-between" px="6">
                <Flex align="center" gap="2">
                    <IconButton aria-label="Back" icon={<ChevronRightIcon transform="rotate(180deg)" />} variant="ghost" onClick={onBack} size="sm" color={textColorMuted} />
                    <Text fontSize="sm" color={textColorMuted}>Dashboard</Text>
                    <ChevronRightIcon color={textColorMuted} w="3" h="3" />
                    <Text fontSize="sm" color={textColorMuted}>Inventory</Text>
                    <ChevronRightIcon color={textColorMuted} w="3" h="3" />
                    <Text fontSize="sm" fontWeight="medium" color={textColorMain}>Seating Category</Text>
                </Flex>
                <Flex gap="3" align="center">
                    <Button leftIcon={<ViewIcon />} variant="outline" size="sm" borderColor={borderColor} color={textColorMuted}>Filter</Button>
                    <Button leftIcon={<DownloadIcon />} variant="outline" size="sm" borderColor={borderColor} color={textColorMuted}>Export</Button>
                    <Button leftIcon={<AddIcon />} variant="solid" bg={bgButton} color={colorButton} _hover={{ bg: bgHoverButton }} size="sm">
                        Add New Item
                    </Button>
                    <IconButton aria-label="Toggle Theme" icon={<ThemeIcon />} onClick={toggleColorMode} variant="ghost" size="sm" color={textColorMuted} />
                </Flex>
            </Flex>

            {/* Main Content */}
            <Flex direction="column" flex="1" p="6" gap="6">
                <Heading size="lg" color={textColorMain}>Category Analysis: Office Seating</Heading>

                {/* KPI Cards */}
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap="4">
                    <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                        <CardBody>
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>TOTAL SKUs</Text>
                            <Text fontSize="2xl" fontWeight="bold" color={textColorMain}>450</Text>
                        </CardBody>
                    </Card>
                    <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                        <CardBody>
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>IN PRODUCTION</Text>
                            <Text fontSize="2xl" fontWeight="bold" color={textColorMain}>50</Text>
                        </CardBody>
                    </Card>
                    <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                        <CardBody>
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>AVAILABLE</Text>
                            <Text fontSize="2xl" fontWeight="bold" color={textColorMain}>400</Text>
                        </CardBody>
                    </Card>
                    <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                        <CardBody>
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>LOW STOCK</Text>
                            <Text fontSize="2xl" fontWeight="bold" color={textColorMain}>15</Text>
                        </CardBody>
                    </Card>
                    <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                        <CardBody>
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>OUT OF STOCK</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="red.500">8</Text>
                        </CardBody>
                    </Card>
                </Grid>

                {/* Stepper */}
                <Box position="relative" my="4">
                    <Box position="absolute" top="15px" left="0" right="0" h="2px" bg={bgStepperLines} zIndex="0" />
                    <Flex justify="space-between" position="relative" zIndex="1" maxW="800px" mx="auto">
                        {['Category Selected', 'Item List Viewing', 'Details Pending', 'Edit Pending', 'Complete Pending'].map((step, i) => (
                            <Flex key={i} direction="column" align="center" bg={bgMain} px="2">
                                <Flex align="center" justify="center" w="8" h="8" borderRadius="full"
                                    bg={i <= 1 ? bgButton : bgCard}
                                    color={i <= 1 ? colorButton : 'gray.300'}
                                    border={i <= 1 ? 'none' : '1px solid'}
                                    borderColor={i <= 1 ? 'transparent' : 'gray.300'}
                                    transition="all 0.2s"
                                    _dark={{
                                        color: i <= 1 ? 'gray.900' : 'gray.600',
                                        bg: i <= 1 ? 'white' : 'gray.800',
                                        borderColor: i <= 1 ? 'transparent' : 'gray.600'
                                    }}
                                >
                                    {i < 1 ? <CheckCircleIcon boxSize="4" /> : i === 1 ? <Box w="2" h="2" borderRadius="full" bg="white" _dark={{ bg: 'gray.900' }} /> : <Box w="2" h="2" borderRadius="full" bg="gray.300" _dark={{ bg: 'gray.600' }} />}
                                </Flex>
                                <Text fontSize="xs" fontWeight={i <= 1 ? 'bold' : 'normal'} color={i <= 1 ? textColorMain : 'gray.500'} mt="2" transition="color 0.2s">
                                    {step.split(' ')[0]}
                                </Text>
                                <Text fontSize="10px" color="gray.500">
                                    {step.split(' ').slice(1).join(' ')}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </Box>

                {/* Split View */}
                <Grid templateColumns="repeat(12, 1fr)" gap="6" flex="1" minH="0">

                    {/* Left Panel: List */}
                    <Box gridColumn={{ base: 'span 12', lg: 'span 8' }} h="100%">
                        <Card h="100%" display="flex" flexDirection="column" bg={useColorModeValue('white', 'gray.800')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <Flex p="4" borderBottom="1px" borderColor={useColorModeValue('gray.100', 'gray.700')} justify="space-between">
                                <InputGroup maxW="300px" size="sm">
                                    <InputLeftElement><SearchIcon color="gray.400" /></InputLeftElement>
                                    <Input placeholder="Search SKU, Product Name..." borderColor={useColorModeValue('gray.200', 'gray.600')} />
                                </InputGroup>
                                <Flex gap="2">
                                    <Button size="sm" variant="outline" rightIcon={<ChevronDownIcon />} borderColor={useColorModeValue('gray.200', 'gray.600')} color={useColorModeValue('gray.600', 'gray.400')}>All Materials</Button>
                                    <Button size="sm" variant="outline" rightIcon={<ChevronDownIcon />} borderColor={useColorModeValue('gray.200', 'gray.600')} color={useColorModeValue('gray.600', 'gray.400')}>Stock Status</Button>
                                </Flex>
                            </Flex>
                            <Box flex="1" overflow="auto">
                                <TableContainer>
                                    <Table variant="simple" size="sm">
                                        <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                                            <Tr>
                                                <Th w="40px" color={useColorModeValue('gray.600', 'gray.400')}><Checkbox borderColor={useColorModeValue('gray.300', 'gray.500')} /></Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>SKU ID</Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>IMAGE</Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>PRODUCT NAME</Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>PROPERTIES</Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>STOCK LEVEL</Th>
                                                <Th color={useColorModeValue('gray.500', 'gray.400')}>STATUS</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {items.map((item) => (
                                                <Tr
                                                    key={item.id}
                                                    cursor="pointer"
                                                    bg={selectedItem.id === item.id ? bgSelected : 'transparent'}
                                                    _hover={{ bg: bgSelected }}
                                                    borderLeft={selectedItem.id === item.id ? '2px solid' : 'none'}
                                                    borderLeftColor={selectedItem.id === item.id ? "blue.500" : "transparent"}
                                                    onClick={() => setSelectedItem(item)}
                                                >
                                                    <Td><Checkbox borderColor={checkboxBorder} /></Td>
                                                    <Td fontWeight="medium" fontSize="xs" color={textColorMuted}>{item.id}</Td>
                                                    <Td>
                                                        <Flex w="8" h="8" bg={bgIcon} borderRadius="md" align="center" justify="center">
                                                            <Icon as={AttachmentIcon} color={colorIcon} />
                                                        </Flex>
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="medium" fontSize="sm" color={textColorMain}>{item.name}</Text>
                                                            <Text fontSize="xs" color="gray.500">{item.category}</Text>
                                                        </Box>
                                                    </Td>
                                                    <Td fontSize="xs" color="gray.500">{item.properties}</Td>
                                                    <Td>
                                                        <Flex align="center" gap="2">
                                                            <Progress value={(item.stock / 600) * 100} size="xs" w="16" colorScheme="gray" borderRadius="full" bg={bgIcon} />
                                                            <Text fontSize="xs" color={textColorMuted}>{Math.floor((item.stock / 600) * 100)}%</Text>
                                                        </Flex>
                                                    </Td>
                                                    <Td>
                                                        <Badge colorScheme={item.colorScheme} variant="solid" fontSize="10px">{item.status}</Badge>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Card>
                    </Box>

                    {/* Right Panel: Details */}
                    <Box gridColumn={{ base: 'span 12', lg: 'span 4' }} h="100%">
                        <Card h="100%" overflow="auto" bg={useColorModeValue('white', 'gray.800')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <Flex p="4" justify="space-between" align="center">
                                <Heading size="sm" color={useColorModeValue('gray.900', 'white')}>Item Details</Heading>
                                <IconButton aria-label="Close" icon={<CloseIcon />} size="xs" variant="ghost" color="gray.500" />
                            </Flex>
                            <CardBody>
                                <VStack align="stretch" spacing="6">
                                    {/* Quick Actions */}
                                    <Box>
                                        <Flex
                                            justify="space-between"
                                            mb="2"
                                            cursor="pointer"
                                            onClick={() => toggleSection('quickActions')}
                                            align="center"
                                        >
                                            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.900', 'white')}>Quick Actions</Text>
                                            <ChevronDownIcon color="gray.500" transform={sections.quickActions ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                        </Flex>
                                        <Collapse in={sections.quickActions} animateOpacity>
                                            <SimpleGrid columns={2} spacing="2">
                                                <Button h="16" flexDirection="column" gap="1" bg={useColorModeValue('gray.900', 'white')} color={useColorModeValue('white', 'gray.900')} _hover={{ bg: useColorModeValue('gray.800', 'gray.200') }} size="sm">
                                                    <Icon as={ViewIcon} /> Edit Details
                                                </Button>
                                                <Button h="16" flexDirection="column" gap="1" variant="outline" size="sm" borderColor={useColorModeValue('gray.200', 'gray.600')} color={useColorModeValue('gray.600', 'gray.400')}>
                                                    <Icon as={CopyIcon} /> Duplicate
                                                </Button>
                                                <Button h="16" flexDirection="column" gap="1" variant="outline" size="sm" borderColor={useColorModeValue('gray.200', 'gray.600')} color={useColorModeValue('gray.600', 'gray.400')}>
                                                    <Icon as={DownloadIcon} /> Export PDF
                                                </Button>
                                                <Button h="16" flexDirection="column" gap="1" variant="outline" size="sm" borderColor={useColorModeValue('gray.200', 'gray.600')} color={useColorModeValue('gray.600', 'gray.400')}>
                                                    <Icon as={EmailIcon} /> Ship Now
                                                </Button>
                                            </SimpleGrid>
                                        </Collapse>
                                    </Box>

                                    <Divider borderColor={useColorModeValue('gray.200', 'gray.700')} />

                                    {/* Product Overview */}
                                    <Box>
                                        <Flex
                                            justify="space-between"
                                            mb="2"
                                            cursor="pointer"
                                            onClick={() => toggleSection('productOverview')}
                                            align="center"
                                        >
                                            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.900', 'white')}>Product Overview</Text>
                                            <ChevronDownIcon color="gray.500" transform={sections.productOverview ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                        </Flex>
                                        <Collapse in={sections.productOverview} animateOpacity>
                                            <Flex bg={useColorModeValue('gray.200', 'gray.700')} borderRadius="md" h="32" align="center" justify="center" mb="4">
                                                <Icon as={AttachmentIcon} boxSize="8" color={useColorModeValue('white', 'gray.500')} />
                                            </Flex>
                                            <Heading size="md" color={useColorModeValue('gray.900', 'white')}>{selectedItem.name}</Heading>
                                            <Text fontSize="xs" color="gray.500" mb="2">{selectedItem.id}</Text>
                                            <Flex gap="2">
                                                <Tag colorScheme={selectedItem.colorScheme} borderRadius="none">{selectedItem.status}</Tag>
                                                <Tag variant="outline" colorScheme="gray" borderRadius="none" color={useColorModeValue('gray.600', 'gray.400')}>Premium</Tag>
                                            </Flex>
                                        </Collapse>
                                    </Box>

                                    <Divider borderColor={useColorModeValue('gray.200', 'gray.700')} />

                                    {/* Lifecycle */}
                                    <Box>
                                        <Flex
                                            justify="space-between"
                                            mb="2"
                                            cursor="pointer"
                                            onClick={() => toggleSection('lifecycle')}
                                            align="center"
                                        >
                                            <Text fontSize="sm" fontWeight="medium">Lifecycle Status</Text>
                                            <ChevronDownIcon transform={sections.lifecycle ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                        </Flex>
                                        <Collapse in={sections.lifecycle} animateOpacity>
                                            <Box pl="4" borderLeft="1px" borderColor="gray.200" ml="2">
                                                {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                                    <Box key={i} position="relative" pb="6">
                                                        <Box position="absolute" left="-19px" top="0" w="4" h="4" borderRadius="full" bg={lifecycleIconBg} display="flex" alignItems="center" justifyContent="center">
                                                            <Icon as={CheckCircleIcon} color={lifecycleIconColor} w="3" h="3" />
                                                        </Box>
                                                        <Text fontSize="sm" fontWeight="medium" lineHeight="1">{step}</Text>
                                                        <Text fontSize="xs" color="gray.500" mt="1">Completed Jan {5 + i * 5}, 2025</Text>
                                                    </Box>
                                                ))}
                                                <Box position="relative" pb="6">
                                                    <Box position="absolute" left="-19px" top="0" w="4" h="4" borderRadius="full" bg={bgCard} border="4px solid" borderColor={lifecycleBorderColor} />
                                                    <Text fontSize="sm" fontWeight="medium" lineHeight="1">Warehouse Storage</Text>
                                                    <Text fontSize="xs" color="gray.500" mt="1">In Progress</Text>
                                                </Box>
                                            </Box>
                                        </Collapse>
                                    </Box>

                                    {/* AI */}
                                    <Box bg={bgAiBox} p="3" borderRadius="md" border="1px" borderColor={borderColor}>
                                        <Flex align="center" gap="2" mb="2">
                                            <Text fontSize="xs" fontWeight="bold" color={textColorMain}>AI Recommendations</Text>
                                            <Box w="1.5" h="1.5" borderRadius="full" bg="green.500" />
                                        </Flex>
                                        <Box bg={bgAiCard} p="3" borderRadius="md" boxShadow="sm">
                                            <Flex gap="2">
                                                <WarningIcon color={warningIconColor} mt="1" />
                                                <Box>
                                                    <Text fontSize="xs" fontWeight="bold" color={textColorMain}>Reorder Recommendation</Text>
                                                    <Text fontSize="xs" color={textColorMuted} mb="2">Stock projected to reach reorder point in 10 days.</Text>
                                                    <Flex gap="2">
                                                        <Button size="xs" bg={poButtonBg} color={poButtonColor} _hover={{ bg: poButtonHover }} onClick={onOpen}>Create PO</Button>
                                                        <Button size="xs" variant="outline" borderColor={borderColor} color={textColorMain}>Dismiss</Button>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>

                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                </Grid>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg={bgCard}>
                    <ModalHeader color={textColorMain}>Create Purchase Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box bg={useColorModeValue('gray.50', 'gray.700')} p="3" borderRadius="md" borderWidth="1px" borderColor={borderColor} mb="4">
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={textColorMuted} mb="2">Order Summary</Text>
                            <Flex justify="space-between" align="center" mb="1">
                                <Text fontWeight="medium" fontSize="sm" color={textColorMain}>{selectedItem.name}</Text>
                                <Text fontSize="sm" color={textColorMain}>x 50 Units</Text>
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <Text fontSize="xs" color={textColorMuted}>SKU: {selectedItem.id}</Text>
                                <Text fontSize="xs" color={textColorMuted}>@ $45.00/unit</Text>
                            </Flex>
                        </Box>
                        <Flex justify="space-between" align="center" py="2" borderTopWidth="1px" borderColor={borderColor}>
                            <Text fontSize="sm" fontWeight="medium" color={textColorMain}>Total Cost</Text>
                            <Text fontSize="lg" fontWeight="bold" color={textColorMain}>$2,250.00</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose} size="sm">Cancel</Button>
                        <Button bg={poButtonBg} color={poButtonColor} _hover={{ bg: poButtonHover }} onClick={() => { onClose(); alert('Purchase Order Created!') }} size="sm">Confirm Order</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
