import {
    Box, Flex, Grid, Heading, Text, Button, Input, InputGroup, InputLeftElement,
    IconButton, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Card, CardBody, VStack, Divider, SimpleGrid,
    Progress, Icon, Checkbox, Tag, useColorModeValue, Collapse,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure,
    Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Textarea,
    Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow
} from '@chakra-ui/react'
import {
    SearchIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, AddIcon,
    CopyIcon, EmailIcon, ViewIcon, CheckCircleIcon,
    CloseIcon, WarningIcon, DownloadIcon, AttachmentIcon, MoonIcon, SunIcon, StarIcon, RepeatIcon, ArrowRightIcon,
    SettingsIcon, InfoIcon, CalendarIcon
} from '@chakra-ui/icons'
import { FaHome, FaBox, FaChartLine, FaClipboardList, FaTh, FaUser, FaCheckCircle, FaList, FaSignOutAlt, FaTruck, FaEdit, FaDownload, FaEllipsisH, FaRobot, FaPaperPlane, FaPlus, FaFileAlt, FaCube, FaClock, FaCheck, FaPen, FaArrowRight } from 'react-icons/fa'
import { useState } from 'react'
import { useColorMode, Image, Portal, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar, AvatarGroup, Radio, RadioGroup, Stack } from '@chakra-ui/react'

import Navbar from './components/Navbar'

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", colorScheme: 'gray', aiStatus: 'info' },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", colorScheme: 'yellow', aiStatus: 'warning' },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock", colorScheme: 'red' },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock", colorScheme: 'gray' },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock", colorScheme: 'yellow' },
]

const messages = [
    {
        id: 1,
        sender: "System",
        avatar: "",
        content: "Order #ORD-2055 has been flagged for manual review due to stock discrepancy.",
        time: "2 hours ago",
        type: "system",
    },
    {
        id: 2,
        sender: "AI Assistant",
        avatar: "AI",
        content: "I've detected a 5-item discrepancy between local and remote warehouse counts for SKU-OFF-2025-003. Recommended action: Synchronize with Warehouse DB or perform manual count.",
        time: "2 hours ago",
        type: "ai",
    },
    {
        id: 3,
        sender: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "@InventoryManager I'm verifying the physical stock in Zone B. Will update shortly.",
        time: "1 hour ago",
        type: "user",
    }
]

const collaborators = [
    { name: "Sarah Chen", role: "Logistics Mgr", status: "online", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Mike Ross", role: "Warehouse Lead", status: "offline", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "AI Agent", role: "System Bot", status: "online", avatar: "AI" },
]

const documents = [
    { name: "Packing_Slip_2055.pdf", size: "245 KB", uploaded: "Jan 12, 2025" },
    { name: "Invoice_INV-8992.pdf", size: "1.2 MB", uploaded: "Jan 12, 2025" },
]

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true,
        aiSuggestions: true
    })
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const [isPOModalOpen, setIsPOModalOpen] = useState(false)
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const { colorMode, toggleColorMode } = useColorMode()
    const ThemeIcon = colorMode === 'light' ? MoonIcon : SunIcon
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isAiOpen, onOpen: onAiOpen, onClose: onAiClose } = useDisclosure()

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
    const bgIcon = useColorModeValue('gray.100', 'gray.700')
    const colorIcon = useColorModeValue('gray.600', 'gray.400')
    const checkboxBorder = useColorModeValue('gray.300', 'gray.600')
    const bgFloating = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(23, 25, 35, 0.8)')

    const handleLogout = () => {
        console.log("Logout triggered")
    }

    return (
        <Box minH="100vh" bg={bgMain} display="flex" flexDirection="column" position="relative">
            {/* Floating Capsule Navbar */}
            <Navbar onLogout={handleLogout} activeTab="Inventory" />

            {/* Page Header (Pushed down) */}
            <Flex
                pt="24"
                px="6"
                pb="4"
                align="center"
                justify="space-between"
                zIndex="20"
                flexShrink={0}
                borderBottom="1px"
                borderColor={useColorModeValue('transparent', 'transparent')}
            >
                <Flex align="center" gap="2">
                    <IconButton aria-label="Back" icon={<ChevronRightIcon transform="rotate(180deg)" />} size="xs" variant="ghost" onClick={onBack} />
                    <Text fontSize="sm" color="gray.500" cursor="pointer" onClick={onBack}>Dashboard</Text>
                    <ChevronRightIcon color="gray.400" w={3} h={3} />
                    <Text fontSize="sm" color="gray.500">Inventory</Text>
                    <ChevronRightIcon color="gray.400" w={3} h={3} />
                    <Text fontSize="sm" fontWeight="medium" color={textColorMain}>Seating Category</Text>
                </Flex>

                <Flex align="center" gap="3">
                    <Button leftIcon={<Icon as={SettingsIcon} />} size="sm" variant="outline">Filter</Button>
                    <Button leftIcon={<DownloadIcon />} size="sm" variant="outline">Export</Button>
                    <Button leftIcon={<AddIcon />} size="sm" colorScheme="blue" bg={useColorModeValue('black', 'white')} color={useColorModeValue('white', 'black')} _hover={{ opacity: 0.8 }}>Add New Item</Button>
                </Flex>
            </Flex>

            {/* Summary Section - OUTSIDE TABS */}
            <Box px="6" pb="6" flexShrink={0}>
                {!isSummaryExpanded ? (
                    <Flex justify="space-between" align="center" bg={bgCard} p="4" borderRadius="xl" shadow="sm" border="1px" borderColor={borderColor}>
                        <HStack spacing="8" divider={<Divider orientation="vertical" h="8" />}>
                            {[
                                { label: 'TOTAL SKUs', value: '450' },
                                { label: 'AVAILABLE', value: '400' },
                                { label: 'LOW STOCK', value: '15', color: 'orange.500' },
                                { label: 'OUT OF STOCK', value: '8', color: 'red.500' },
                            ].map((stat, i) => (
                                <Box key={i}>
                                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color="gray.500">{stat.label}</Text>
                                    <Text fontSize="xl" fontWeight="bold" color={stat.color || textColorMain}>{stat.value}</Text>
                                </Box>
                            ))}
                        </HStack>

                        <Flex align="center" gap="6">
                            <Box display={{ base: 'none', md: 'block' }}>
                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color="gray.500" textAlign="right">Current Phase</Text>
                                <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Item List Viewing</Text>
                            </Box>
                            <Button size="sm" variant="ghost" onClick={() => setIsSummaryExpanded(true)} fontSize="xs" color="gray.500">
                                Show Details <ChevronDownIcon ml="1" />
                            </Button>
                        </Flex>
                    </Flex>
                ) : (
                    <Box>
                        <Flex justify="flex-end" mb="2">
                            <Button size="sm" variant="ghost" onClick={() => setIsSummaryExpanded(false)} fontSize="xs" color="gray.500">
                                Hide Details <ChevronUpIcon ml="1" />
                            </Button>
                        </Flex>
                        <SimpleGrid columns={5} spacing="4" mb="8">
                            {[
                                { label: 'TOTAL SKUs', value: '450' },
                                { label: 'IN PRODUCTION', value: '50' },
                                { label: 'AVAILABLE', value: '400' },
                                { label: 'LOW STOCK', value: '15', color: 'orange.500' },
                                { label: 'OUT OF STOCK', value: '8', color: 'red.500' },
                            ].map((stat, i) => (
                                <Card key={i} variant="outline" bg={bgCard} borderColor={borderColor}>
                                    <CardBody p="4">
                                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color="gray.500">{stat.label}</Text>
                                        <Text fontSize="2xl" fontWeight="bold" color={stat.color || textColorMain}>{stat.value}</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>

                        {/* Stepper Mockup */}
                        <Box py="6" borderTop="1px" borderColor={borderColor}>
                            <Box position="relative">
                                <Box position="absolute" top="15px" left="0" w="full" h="2px" bg={useColorModeValue('gray.200', 'gray.700')} zIndex={0} />
                                <Flex justify="space-between" position="relative" zIndex={1} maxW="4xl" mx="auto">
                                    {[
                                        { name: 'Category Selected', status: 'completed' },
                                        { name: 'Item List Viewing', status: 'current' },
                                        { name: 'Details Pending', status: 'pending' },
                                        { name: 'Edit Pending', status: 'pending' },
                                        { name: 'Complete Pending', status: 'pending' }
                                    ].map((step, i) => (
                                        <VStack key={i} spacing="3">
                                            <Flex
                                                w="8" h="8" rounded="full" align="center" justify="center"
                                                bg={step.status === 'completed' ? 'black' : step.status === 'current' ? 'white' : 'gray.100'}
                                                border={step.status === 'current' ? '2px solid black' : 'none'}
                                                color={step.status === 'completed' ? 'white' : 'black'}
                                            >
                                                {step.status === 'completed' ? <CheckCircleIcon w={4} h={4} /> : step.status === 'current' ? <Box w="2.5" h="2.5" bg="black" rounded="full" /> : <Box w="2" h="2" bg="gray.300" rounded="full" />}
                                            </Flex>
                                            <VStack spacing="0">
                                                <Text fontSize="xs" fontWeight="bold">{step.name.split(' ')[0]}</Text>
                                                <Text fontSize="10px" color="gray.500">{step.name.split(' ').slice(1).join(' ')}</Text>
                                            </VStack>
                                        </VStack>
                                    ))}
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Main Content with Tabs */}
            <Box flex="1" position="relative">
                <Tabs isLazy variant="line" colorScheme="black" display="flex" flexDirection="column" h="100%">
                    <Flex borderBottom="1px" borderColor={borderColor} justify="space-between" align="center" px="6" bg={bgCard}>
                        <TabList borderBottom="none">
                            <Tab fontSize="sm" fontWeight="semibold" px="4" py="4" _selected={{ color: textColorMain, borderBottom: '2px solid', borderColor: textColorMain }}>Order Info</Tab>
                            <Tab fontSize="sm" fontWeight="semibold" px="4" py="4" _selected={{ color: textColorMain, borderBottom: '2px solid', borderColor: textColorMain }}>Activity Stream</Tab>
                        </TabList>
                    </Flex>

                    <TabPanels flex="1">
                        <TabPanel p="0" display="flex" flexDirection="column" bg={bgMain}>
                            {/* Split View */}
                            <Grid templateColumns="repeat(12, 1fr)" gap="6" flex="1" p="6" pt="6">

                                {/* Left Panel: List */}
                                <Box gridColumn={{ base: 'span 12', lg: 'span 8' }}>
                                    <Card display="flex" flexDirection="column" bg={bgCard} borderColor={borderColor} variant="outline" boxShadow="sm">
                                        <Flex p="4" borderBottom="1px" borderColor={borderColor} justify="space-between">
                                            <InputGroup maxW="300px" size="sm">
                                                <InputLeftElement><SearchIcon color="gray.400" /></InputLeftElement>
                                                <Input placeholder="Search SKU, Product Name..." borderColor={borderColor} />
                                            </InputGroup>
                                            <Flex gap="2">
                                                <Button size="sm" variant="outline" rightIcon={<ChevronDownIcon />} borderColor={borderColor} color={textColorMuted}>All Materials</Button>
                                                <Button size="sm" variant="outline" rightIcon={<ChevronDownIcon />} borderColor={borderColor} color={textColorMuted}>Stock Status</Button>
                                            </Flex>
                                        </Flex>
                                        <Box>
                                            <TableContainer>
                                                <Table variant="simple" size="sm">
                                                    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                                                        <Tr>
                                                            <Th w="40px" color={textColorMuted}><Checkbox borderColor={checkboxBorder} /></Th>
                                                            <Th color={textColorMuted}>SKU ID</Th>
                                                            <Th color={textColorMuted}>IMAGE</Th>
                                                            <Th color={textColorMuted}>PRODUCT NAME</Th>
                                                            <Th color={textColorMuted}>PROPERTIES</Th>
                                                            <Th color={textColorMuted}>STOCK LEVEL</Th>
                                                            <Th color={textColorMuted}>STATUS</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {items.map((item) => (
                                                            <Tr
                                                                key={item.id}
                                                                cursor="pointer"
                                                                bg={selectedItem.id === item.id ? useColorModeValue('gray.50', 'whiteAlpha.100') : 'transparent'}
                                                                _hover={{ bg: selectedItem.id === item.id ? useColorModeValue('gray.50', 'whiteAlpha.100') : useColorModeValue('gray.50', 'gray.700') }}
                                                                onClick={() => setSelectedItem(item)}
                                                            >
                                                                <Td><Checkbox borderColor={checkboxBorder} /></Td>
                                                                <Td fontWeight="medium" fontSize="xs" color={textColorMain}>{item.id}</Td>
                                                                <Td>
                                                                    <Flex w="8" h="8" bg={bgIcon} borderRadius="md" align="center" justify="center">
                                                                        <Icon as={FaBox} color="gray.400" />
                                                                    </Flex>
                                                                </Td>
                                                                <Td>
                                                                    <Box>
                                                                        <Flex align="center" gap="2">
                                                                            <Text fontWeight="medium" fontSize="sm" color={textColorMain}>{item.name}</Text>
                                                                            {(item as any).aiStatus && (
                                                                                <Box position="relative" display="flex" h="2" w="2">
                                                                                    <Box position="absolute" display="inline-flex" h="full" w="full" borderRadius="full" bg={(item as any).aiStatus === 'warning' ? 'orange.400' : 'blue.400'} opacity="0.75" animation="ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" />
                                                                                    <Box position="relative" display="inline-flex" borderRadius="full" h="2" w="2" bg={(item as any).aiStatus === 'warning' ? 'orange.500' : 'blue.500'} />
                                                                                </Box>
                                                                            )}
                                                                        </Flex>
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
                                                                    <Badge
                                                                        variant="subtle"
                                                                        fontSize="10px"
                                                                        colorScheme={item.status === 'In Stock' ? 'gray' : item.status === 'Low Stock' ? 'orange' : 'red'}
                                                                    >
                                                                        {item.status}
                                                                    </Badge>
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
                                <Box gridColumn={{ base: 'span 12', lg: 'span 4' }}>
                                    <Card bg={bgCard} borderColor={borderColor} variant="outline" boxShadow="sm" display="flex" flexDirection="column">
                                        <Flex borderBottom="1px" borderColor={borderColor} align="center" justify="space-between" px="4" py="3" flexShrink={0}>
                                            <Text fontSize="md" fontWeight="bold" color={textColorMain}>Item Details</Text>
                                            <Flex align="center" gap="1">
                                                <IconButton aria-label="Edit" icon={<Icon as={FaEdit} />} size="xs" variant="ghost" color="gray.500" />
                                                <IconButton aria-label="Export" icon={<Icon as={FaDownload} />} size="xs" variant="ghost" color="gray.500" />
                                                <IconButton aria-label="Ship" icon={<Icon as={FaTruck} />} size="xs" variant="ghost" color="gray.500" />
                                                <IconButton aria-label="AI" icon={<Icon as={FaRobot} color="purple.500" />} size="xs" variant="ghost" onClick={onAiOpen} />
                                                <IconButton aria-label="More" icon={<Icon as={FaEllipsisH} />} size="xs" variant="ghost" color="gray.500" />
                                            </Flex>
                                        </Flex>

                                        <CardBody p="4">
                                            <VStack align="stretch" spacing="6">
                                                {/* AI Side Panel Section */}
                                                {(selectedItem as any).aiStatus && (
                                                    <Box>
                                                        <Flex
                                                            align="center"
                                                            justify="space-between"
                                                            mb="2"
                                                            cursor="pointer"
                                                            onClick={() => toggleSection('aiSuggestions')}
                                                            userSelect="none"
                                                        >
                                                            <Flex align="center" gap="2">
                                                                <Icon as={FaRobot} color="purple.500" />
                                                                <Text fontSize="sm" fontWeight="bold" color={textColorMain}>AI Suggestions</Text>
                                                                <Box position="relative" display="flex" h="2" w="2">
                                                                    <Box position="absolute" display="inline-flex" h="full" w="full" borderRadius="full" bg="purple.400" opacity="0.75" animation="ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" />
                                                                    <Box position="relative" display="inline-flex" borderRadius="full" h="2" w="2" bg="purple.500" />
                                                                </Box>
                                                            </Flex>
                                                            <ChevronDownIcon color="gray.500" transform={sections.aiSuggestions ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                                        </Flex>

                                                        <Collapse in={sections.aiSuggestions} animateOpacity>
                                                            {(selectedItem as any).aiStatus === 'info' ? (
                                                                <Box bg={useColorModeValue('blue.50', 'whiteAlpha.100')} p="3" borderRadius="md" border="1px" borderColor={useColorModeValue('blue.100', 'whiteAlpha.200')}>
                                                                    <Text fontSize="xs" fontWeight="semibold" color={useColorModeValue('blue.700', 'blue.200')} mb="2">Optimization Opportunity</Text>
                                                                    <VStack spacing="2" align="stretch">
                                                                        <Flex p="2" bg={bgCard} borderWidth="1px" borderColor="gray.200" borderRadius="md" _hover={{ borderColor: 'blue.300' }} cursor="pointer" transition="all 0.2s">
                                                                            <Box mt="1" mr="2" w="3" h="3" borderRadius="full" border="1px" borderColor="gray.400" display="flex" alignItems="center" justifyContent="center">
                                                                                <Box w="1.5" h="1.5" borderRadius="full" />
                                                                            </Box>
                                                                            <Box>
                                                                                <Text fontSize="xs" fontWeight="medium">Standard (Current)</Text>
                                                                                <Text fontSize="10px" color="gray.500">Listed Price</Text>
                                                                            </Box>
                                                                        </Flex>
                                                                        <Flex p="2" bg={bgCard} borderWidth="1px" borderColor="gray.200" borderRadius="md" _hover={{ borderColor: 'green.300' }} cursor="pointer" transition="all 0.2s">
                                                                            <Box mt="1" mr="2" w="3" h="3" borderRadius="full" border="1px" borderColor="green.500" display="flex" alignItems="center" justifyContent="center">
                                                                                <Box w="1.5" h="1.5" borderRadius="full" bg="green.500" />
                                                                            </Box>
                                                                            <Box>
                                                                                <Text fontSize="xs" fontWeight="medium" color="green.600">Eco-Friendly Option</Text>
                                                                                <Text fontSize="10px" color="gray.500">-15% Carbon Footprint</Text>
                                                                            </Box>
                                                                        </Flex>
                                                                    </VStack>
                                                                    <Button size="xs" w="full" mt="3" colorScheme="blue">Apply Selection</Button>
                                                                </Box>
                                                            ) : (
                                                                <Box bg={useColorModeValue('orange.50', 'whiteAlpha.100')} p="3" borderRadius="md" border="1px" borderColor={useColorModeValue('orange.100', 'whiteAlpha.200')}>
                                                                    <Flex gap="2">
                                                                        <Icon as={WarningIcon} color="orange.500" mt="0.5" />
                                                                        <Box>
                                                                            <Text fontSize="xs" fontWeight="bold" color={useColorModeValue('orange.800', 'orange.200')}>Stock Alert</Text>
                                                                            <Text fontSize="xs" color={useColorModeValue('orange.700', 'orange.300')}>Inventory invalid. Sync with warehouse?</Text>
                                                                        </Box>
                                                                    </Flex>
                                                                    <Button size="xs" w="full" mt="2" colorScheme="orange" variant="outline" bg={useColorModeValue('white', 'transparent')}>Sync Now</Button>
                                                                </Box>
                                                            )}
                                                        </Collapse>
                                                    </Box>
                                                )}

                                                {/* Product Overview */}
                                                <Box>
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        mb="2"
                                                        cursor="pointer"
                                                        onClick={() => toggleSection('productOverview')}
                                                    >
                                                        <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Product Overview</Text>
                                                        <ChevronDownIcon color="gray.500" transform={sections.productOverview ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                                    </Flex>
                                                    <Collapse in={sections.productOverview} animateOpacity>
                                                        <Box pl="2" borderLeft="2px" borderColor="gray.100" mb="4">
                                                            <Flex bg="gray.100" h="150px" borderRadius="md" align="center" justify="center" mb="4">
                                                                <Icon as={FaCube} boxSize="12" color="gray.300" />
                                                            </Flex>
                                                            <Box>
                                                                <Heading size="sm" mb="1" color={textColorMain}>{selectedItem.name}</Heading>
                                                                <Text fontSize="sm" color="gray.500" mb="2">{selectedItem.id}</Text>
                                                                <Flex gap="2">
                                                                    <Badge colorScheme={selectedItem.colorScheme}>{selectedItem.status}</Badge>
                                                                    <Badge variant="outline" colorScheme="gray">Premium</Badge>
                                                                </Flex>
                                                            </Box>
                                                        </Box>
                                                    </Collapse>
                                                </Box>

                                                <Divider my="4" />

                                                {/* Lifecycle Status */}
                                                <Box>
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        mb="2"
                                                        cursor="pointer"
                                                        onClick={() => toggleSection('lifecycle')}
                                                    >
                                                        <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Lifecycle Status</Text>
                                                        <ChevronDownIcon color="gray.500" transform={sections.lifecycle ? "rotate(0deg)" : "rotate(-90deg)"} transition="transform 0.2s" />
                                                    </Flex>
                                                    <Collapse in={sections.lifecycle} animateOpacity>
                                                        <Box pl="4" ml="2" borderLeft="1px" borderColor="gray.200" mb="0">
                                                            {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                                                <Box key={i} position="relative" pb="4">
                                                                    <Box position="absolute" left="-21px" top="1" w="2" h="2" borderRadius="full" bg={textColorMain} />
                                                                    <Text fontSize="sm" fontWeight="medium" lineHeight="none" color={textColorMain}>{step}</Text>
                                                                    <Text fontSize="xs" color="gray.500" mt="1">Completed Jan {5 + i * 5}, 2025</Text>
                                                                </Box>
                                                            ))}
                                                            <Box position="relative">
                                                                <Box position="absolute" left="-21px" top="0" w="4" h="4" borderRadius="full" bg={bgCard} border="2px" borderColor={textColorMain} zIndex="1" />
                                                                <Text fontSize="sm" fontWeight="medium" lineHeight="none" color={textColorMain}>Warehouse Storage</Text>
                                                                <Text fontSize="xs" color="gray.500" mt="1">In Progress</Text>
                                                            </Box>
                                                        </Box>
                                                    </Collapse>
                                                </Box>

                                                <Divider my="4" />

                                                {/* Action Required */}
                                                <Box>
                                                    <Heading size="sm" mb="3" color={textColorMain}>Action Required</Heading>
                                                    <VStack spacing="3" align="stretch" pl="4" borderLeft="1px" borderColor="gray.200" ml="2">
                                                        <Button size="sm" onClick={() => setIsPOModalOpen(true)} bg="black" color="white" _hover={{ bg: 'gray.800' }} _dark={{ bg: 'white', color: 'black', _hover: { bg: 'gray.200' } }} w="full">
                                                            Create Purchase Order
                                                        </Button>
                                                        <Button size="sm" variant="outline" w="full" borderColor="gray.200" _hover={{ bg: 'gray.50' }} _dark={{ borderColor: 'gray.700', _hover: { bg: 'gray.800' } }}>
                                                            Send Acknowledgment
                                                        </Button>
                                                    </VStack>
                                                </Box>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                </Box>
                            </Grid>
                        </TabPanel>

                        <TabPanel p="0">
                            <Flex>
                                {/* Chat Area */}
                                <Flex direction="column" borderRight="1px" borderColor={borderColor} w="full">
                                    {/* Header */}
                                    <Flex justify="space-between" align="center" px="6" py="4" borderBottom="1px" borderColor={borderColor} bg={bgCard}>
                                        <Box>
                                            <Flex align="center" gap="2">
                                                <Heading size="md" color={textColorMain}>Activity Stream</Heading>
                                                <Badge variant="subtle" borderRadius="full" px="2" colorScheme="gray">#ORD-2055</Badge>
                                            </Flex>
                                            <Text fontSize="sm" color="gray.500">Real-time updates and collaboration</Text>
                                        </Box>
                                        <Flex align="center" gap="3">
                                            <AvatarGroup size="sm" max={3}>
                                                {collaborators.map((c, i) => (
                                                    <Avatar key={i} name={c.name} src={c.avatar === 'AI' ? undefined : c.avatar} bg={c.avatar === 'AI' ? 'purple.500' : undefined} icon={c.avatar === 'AI' ? <Icon as={FaRobot} /> : undefined} />
                                                ))}
                                            </AvatarGroup>
                                            <IconButton
                                                icon={<Icon as={FaPlus} />}
                                                aria-label="Add participant"
                                                size="sm"
                                                isRound
                                                variant="outline"
                                                borderColor={borderColor}
                                            />
                                        </Flex>
                                    </Flex>
                                    <Box p="4" minH="800px">
                                        <VStack spacing="4" align="stretch">
                                            <Flex justify="center"><Badge variant="outline" fontSize="xs">Today, 9:23 AM</Badge></Flex>
                                            {messages.map((msg) => (
                                                <Flex key={msg.id} gap="3" direction={msg.type === 'user' ? 'row-reverse' : 'row'}>
                                                    {msg.type !== 'user' && (
                                                        <Avatar size="sm" src={msg.avatar === 'AI' ? undefined : msg.avatar} icon={msg.avatar === 'AI' ? <Icon as={FaRobot} /> : undefined} bg={msg.avatar === 'AI' ? 'purple.100' : undefined} color={msg.avatar === 'AI' ? 'purple.600' : undefined} />
                                                    )}
                                                    <Box maxW="80%">
                                                        <Flex align="center" gap="2" justify={msg.type === 'user' ? 'flex-end' : 'flex-start'} mb="1">
                                                            {msg.type !== 'user' && <Text fontSize="xs" fontWeight="bold">{msg.sender}</Text>}
                                                            <Text fontSize="xs" color="gray.500">{msg.time}</Text>
                                                        </Flex>
                                                        <Box p="3" borderRadius="lg" bg={msg.type === 'user' ? 'blue.500' : bgCard} color={msg.type === 'user' ? 'white' : textColorMain} border={msg.type === 'user' ? 'none' : '1px solid'} borderColor={borderColor}>
                                                            <Text fontSize="sm">{msg.content}</Text>
                                                            <Box mt="2">
                                                                {msg.type === 'ai' && (
                                                                    <HStack spacing="2">
                                                                        <Button size="xs" variant="outline" colorScheme="purple">Create Task</Button>
                                                                        <Button size="xs" variant="ghost">Dismiss</Button>
                                                                    </HStack>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Flex>
                                            ))}
                                        </VStack>
                                    </Box>
                                    <Box position="sticky" bottom={4} mx={4} mb={4} p="4" bg={bgCard} borderRadius="2xl" boxShadow="lg" zIndex={10} border="1px solid" borderColor={borderColor}>
                                        <Flex gap="2">
                                            <IconButton aria-label="Attach" icon={<Icon as={AttachmentIcon} />} variant="ghost" size="sm" />
                                            <Input placeholder="Type your message..." size="sm" borderRadius="full" />
                                            <IconButton aria-label="Send" icon={<Icon as={FaPaperPlane} />} colorScheme="blue" size="sm" borderRadius="full" />
                                        </Flex>
                                    </Box>
                                </Flex>

                                {/* Contextual Quick Actions Sidebar */}
                                <Flex direction="column" w="72" display={{ base: 'none', '2xl': 'flex' }} bg={useColorModeValue('gray.50', 'gray.900')} borderLeft="1px" borderColor={borderColor} h="full" animation="slideInRight 0.5s">
                                    <Box p="5" borderBottom="1px" borderColor={borderColor} bg={useColorModeValue('white', 'gray.800')}>
                                        <Flex justify="space-between" align="center" mb="2">
                                            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider">Context</Text>
                                            <Box w="2" h="2" borderRadius="full" bg="orange.400" animation="pulse 2s infinite" />
                                        </Flex>
                                        <Flex align="center" gap="3">
                                            <Flex align="center" justify="center" w="10" h="10" borderRadius="full" bg={useColorModeValue('orange.100', 'orange.900')} border="1px" borderColor={useColorModeValue('orange.200', 'orange.700')}>
                                                <Icon as={FaClock} color={useColorModeValue('orange.600', 'orange.300')} boxSize="5" />
                                            </Flex>
                                            <Box>
                                                <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Pending Review</Text>
                                                <Text fontSize="xs" color="gray.500">Waiting for Final Approval (2/3)</Text>
                                            </Box>
                                        </Flex>
                                    </Box>

                                    <Box flex="1" p="5" overflowY="auto">
                                        <Box mb="6">
                                            <Text fontSize="xs" fontWeight="medium" color="gray.500" mb="3" textTransform="uppercase" letterSpacing="wide">Suggested Actions</Text>
                                            <VStack spacing="3">
                                                <Button h="auto" p="3" w="full" variant="outline" borderColor={borderColor} bg={bgCard} _hover={{ borderColor: 'blue.400', boxShadow: 'md' }} justifyContent="flex-start">
                                                    <Flex gap="3" align="flex-start" w="full">
                                                        <Flex align="center" justify="center" w="8" h="8" borderRadius="lg" bg={useColorModeValue('blue.50', 'blue.900')} color={useColorModeValue('blue.600', 'blue.300')}>
                                                            <Icon as={FaFileAlt} boxSize="4" />
                                                        </Flex>
                                                        <Box textAlign="left">
                                                            <Text fontSize="sm" fontWeight="medium" color={textColorMain} _groupHover={{ color: 'blue.500' }}>Process Quote</Text>
                                                            <Text fontSize="10px" color="gray.500" fontWeight="normal">Analyze PDF & Extract Data</Text>
                                                        </Box>
                                                    </Flex>
                                                </Button>

                                                <Button h="auto" p="3" w="full" variant="outline" borderColor={borderColor} bg={bgCard} _hover={{ borderColor: 'green.400', boxShadow: 'md' }} justifyContent="flex-start">
                                                    <Flex gap="3" align="flex-start" w="full">
                                                        <Flex align="center" justify="center" w="8" h="8" borderRadius="lg" bg={useColorModeValue('green.50', 'green.900')} color={useColorModeValue('green.600', 'green.300')}>
                                                            <Icon as={FaCheck} boxSize="4" />
                                                        </Flex>
                                                        <Box textAlign="left">
                                                            <Text fontSize="sm" fontWeight="medium" color={textColorMain} _groupHover={{ color: 'green.500' }}>Approve Order</Text>
                                                            <Text fontSize="10px" color="gray.500" fontWeight="normal">Move to Production</Text>
                                                        </Box>
                                                    </Flex>
                                                </Button>

                                                <Button h="auto" p="3" w="full" variant="outline" borderColor={borderColor} bg={bgCard} _hover={{ borderColor: 'orange.400', boxShadow: 'md' }} justifyContent="flex-start">
                                                    <Flex gap="3" align="flex-start" w="full">
                                                        <Flex align="center" justify="center" w="8" h="8" borderRadius="lg" bg={useColorModeValue('orange.50', 'orange.900')} color={useColorModeValue('orange.600', 'orange.300')}>
                                                            <Icon as={FaPen} boxSize="4" />
                                                        </Flex>
                                                        <Box textAlign="left">
                                                            <Text fontSize="sm" fontWeight="medium" color={textColorMain} _groupHover={{ color: 'orange.500' }}>Request Changes</Text>
                                                            <Text fontSize="10px" color="gray.500" fontWeight="normal">Send feedback to vendor</Text>
                                                        </Box>
                                                    </Flex>
                                                </Button>
                                            </VStack>
                                        </Box>

                                        <Box>
                                            <Text fontSize="xs" fontWeight="medium" color="gray.500" mb="3" textTransform="uppercase" letterSpacing="wide">Live Updates</Text>
                                            <Box p="3" borderRadius="xl" bg={useColorModeValue('blue.50', 'blue.900')} border="1px" borderColor={useColorModeValue('blue.100', 'blue.800')}>
                                                <Flex gap="2">
                                                    <Flex align="center" justify="center" w="6" h="6" borderRadius="full" bg={useColorModeValue('blue.100', 'blue.800')} flexShrink={0} pos="relative">
                                                        <Box w="3" h="3" borderRadius="full" bg="blue.400" opacity="0.75" pos="absolute" animation="ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" />
                                                        <Box w="1.5" h="1.5" borderRadius="full" bg="blue.500" pos="relative" />
                                                    </Flex>
                                                    <Box>
                                                        <Text fontSize="xs" fontWeight="medium" color={useColorModeValue('blue.900', 'blue.100')}>AI Assistant is processing...</Text>
                                                        <Text fontSize="10px" color={useColorModeValue('blue.700', 'blue.300')} mt="1">Estimated completion: 30s</Text>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box p="4" borderTop="1px" borderColor={borderColor} bg={useColorModeValue('gray.50', 'gray.800')}>
                                        <Button variant="ghost" size="xs" w="full" color="gray.500" _hover={{ color: textColorMain }} rightIcon={<Icon as={FaArrowRight} />}>
                                            View Activity Log
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            {/* Document Preview Modal */}
            <Modal isOpen={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)} size="xl">
                <ModalOverlay />
                <ModalContent bg={bgCard}>
                    <ModalHeader>Document Preview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box h="400px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                            <Text color="gray.500">PDF Preview Placeholder</Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsDocumentModalOpen(false)}>Close</Button>
                        <Button variant="ghost">Download</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* AI Diagnosis Modal */}
            <Modal isOpen={isAiOpen} onClose={onAiClose} size="lg">
                <ModalOverlay />
                <ModalContent bg={bgCard}>
                    <ModalHeader display="flex" alignItems="center" gap="2">
                        <Icon as={FaRobot} color="purple.500" />
                        AI Diagnosis
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="4" align="stretch">
                            <Box p="4" bg="purple.50" borderRadius="md" borderLeft="4px" borderColor="purple.500">
                                <Heading size="sm" color="purple.700" mb="2">Anomaly Detected</Heading>
                                <Text fontSize="sm" color="purple.800">
                                    Stock depletion rate for <strong>{selectedItem.name}</strong> is 40% higher than historical average. Potential supply chain bottleneck identified in Region B.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="sm" mb="2">Recommended Actions</Heading>
                                <VStack spacing="2" align="stretch">
                                    <Button justifyContent="flex-start" variant="outline" size="sm">Initiate transfer from Warehouse A</Button>
                                    <Button justifyContent="flex-start" variant="outline" size="sm">Adjust reorder point to 50 units</Button>
                                </VStack>
                            </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="purple" onClick={onAiClose}>Apply Recommendations</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}


