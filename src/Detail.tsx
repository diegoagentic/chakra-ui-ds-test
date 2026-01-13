import {
    Box, Flex, Grid, Heading, Text, Button, Input, InputGroup, InputLeftElement,
    IconButton, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Card, CardBody, VStack, Divider, SimpleGrid,
    Progress, Icon, Checkbox, Tag, useColorModeValue, Collapse,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure,
    Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Textarea
} from '@chakra-ui/react'
import {
    SearchIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, AddIcon,
    CopyIcon, EmailIcon, ViewIcon, CheckCircleIcon,
    CloseIcon, WarningIcon, DownloadIcon, AttachmentIcon, MoonIcon, SunIcon, StarIcon, RepeatIcon, ArrowRightIcon
} from '@chakra-ui/icons'
import { FaHome, FaBox, FaChartLine, FaClipboardList, FaTh, FaUser, FaCheckCircle, FaCalendar, FaList, FaSignOutAlt, FaTruck, FaEdit, FaDownload, FaEllipsisH, FaRobot, FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'
import { useColorMode, Image, Portal, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar, Radio, RadioGroup, Stack } from '@chakra-ui/react'

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
    const [isAppsOpen, setIsAppsOpen] = useState(false)
    const onLogout = () => { console.log('Logout') }

    // Glassmorphism Styles
    const navBorder = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)')
    const navShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.07)"

    return (
        <Flex direction="column" minH="100vh" bg={bgMain}>
            {/* Floating Capsule Navbar */}
            <Box
                position="fixed"
                top="24px"
                left="50%"
                transform="translateX(-50%)"
                zIndex={100}
                w="auto"
                p="2"
                borderRadius="full"
                bg={useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(23, 25, 35, 0.7)')}
                backdropFilter="blur(24px)"
                border="1px solid"
                borderColor={navBorder}
                boxShadow={navShadow}
            >
                <Flex align="center" gap="2">
                    {/* Logo */}
                    <Box px="4">
                        <Image
                            src={useColorModeValue('/logo-on-light.jpg', '/logo-on-dark.jpg')}
                            h="20px"
                            alt="Strata"
                        />
                    </Box>
                    <Box w="1px" h="24px" bg={useColorModeValue('gray.300', 'whiteAlpha.300')} mx="1" />

                    {/* Nav Items */}
                    <Flex gap="1">
                        <NavItem icon={FaHome} label="Overview" isActive />
                        <NavItem icon={FaBox} label="Inventory" />
                        <NavItem icon={FaChartLine} label="Production" />
                        <NavItem icon={FaClipboardList} label="Orders" />
                    </Flex>

                    <Box w="1px" h="24px" bg={useColorModeValue('gray.300', 'whiteAlpha.300')} mx="1" />

                    {/* Actions */}
                    <Flex align="center" gap="2" pr="2" position="relative">
                        <IconButton
                            aria-label="Apps"
                            icon={<FaTh />}
                            variant="ghost"
                            rounded="full"
                            size="sm"
                            color="gray.500"
                            _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
                            onClick={() => setIsAppsOpen(!isAppsOpen)}
                        />

                        {isAppsOpen && (
                            <Portal>
                                <Box
                                    position="fixed"
                                    inset="0"
                                    bg="transparent"
                                    zIndex={99}
                                    onClick={() => setIsAppsOpen(false)}
                                />
                                <Box
                                    bg={useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(23, 25, 35, 0.85)')}
                                    backdropFilter="blur(16px)"
                                    border="1px solid"
                                    borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                                    w="400px"
                                    borderRadius="2xl"
                                    boxShadow="2xl"
                                    p="6"
                                    position="fixed"
                                    top="90px"
                                    left="50%"
                                    transform="translateX(-50%)"
                                    zIndex={100}
                                    transition="all 0.2s"
                                >
                                    <SimpleGrid columns={3} spacing="6">
                                        {[
                                            { icon: FaHome, label: "Portal", color: "blue.500", bg: "blue.50", darkBg: "blue.900" },
                                            { icon: FaUser, label: "CRM", color: "purple.500", bg: "purple.50", darkBg: "purple.900" },
                                            { icon: FaClipboardList, label: "Invoice", color: "green.500", bg: "green.50", darkBg: "green.900" },
                                            { icon: FaBox, label: "Inventory", color: "orange.500", bg: "orange.50", darkBg: "orange.900" },
                                            { icon: FaChartLine, label: "Analytics", color: "pink.500", bg: "pink.50", darkBg: "pink.900" },
                                            { icon: FaCheckCircle, label: "Support", color: "cyan.500", bg: "cyan.50", darkBg: "cyan.900" },
                                            { icon: FaTh, label: "Board", color: "indigo.500", bg: "indigo.50", darkBg: "indigo.900" },
                                            { icon: FaCalendar, label: "Calendar", color: "red.500", bg: "red.50", darkBg: "red.900" },
                                            { icon: FaList, label: "More", color: "gray.500", bg: "gray.100", darkBg: "gray.700" },
                                        ].map((app, i) => (
                                            <VStack
                                                key={i}
                                                cursor="pointer"
                                                role="group"
                                                transition="all 0.2s"
                                                _hover={{ transform: 'scale(1.05)' }}
                                            >
                                                <Flex
                                                    w="12" h="12"
                                                    align="center" justify="center"
                                                    rounded="xl"
                                                    bg={useColorModeValue(app.bg, app.darkBg)}
                                                    color={app.color}
                                                    boxShadow="sm"
                                                    mb="1"
                                                >
                                                    <Box as={app.icon} boxSize="5" />
                                                </Flex>
                                                <Text fontSize="xs" fontWeight="medium" color={textColorMuted} _groupHover={{ color: textColorMain }}>{app.label}</Text>
                                            </VStack>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                            </Portal>
                        )}
                        <IconButton
                            aria-label="Toggle Theme"
                            icon={<ThemeIcon />}
                            onClick={toggleColorMode}
                            variant="ghost"
                            rounded="full"
                            size="sm"
                            color="gray.500"
                            _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
                        />
                        <Menu>
                            <MenuButton as={Button} rounded="full" w="32px" h="32px" minW="32px" p="0" variant="ghost" _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}>
                                <Avatar size="xs" name="Jhon Doe" bgGradient="linear(to-r, blue.400, purple.500)" color="white" fontWeight="bold" />
                            </MenuButton>
                            <MenuList bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')} backdropFilter="blur(10px)" borderColor={borderColor} shadow="lg" p="2" borderRadius="xl">
                                <Box px="3" py="2">
                                    <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Jhon Doe</Text>
                                    <Text fontSize="xs" color="gray.500">Admin</Text>
                                </Box>
                                <MenuDivider />
                                <MenuItem icon={<FaSignOutAlt />} onClick={onLogout} color="red.500" borderRadius="md">Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>

            {/* Page Header (retained but adjusted) */}
            <Box pt="24" px="6" pb="4">
                <Flex align="center" justify="space-between">
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
                    </Flex>
                </Flex>
            </Box>

            {/* Main Content */}
            <Flex direction="column" flex="1" px="6" pb="6" gap="6">
                <Flex align="center" justify="space-between" mb="4">
                    <Heading size="lg" color={textColorMain}>Category Analysis: Office Seating</Heading>
                </Flex>
                {/* Collapsible Summary */}
                <Box mb="6">
                    {isSummaryExpanded ? (
                        <>
                            <Flex justify="flex-end" mb="2">
                                <Button size="sm" variant="ghost" onClick={() => setIsSummaryExpanded(false)} color="gray.500">
                                    Hide Details <ChevronUpIcon ml="2" />
                                </Button>
                            </Flex>
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

                            {/* Integrated Stepper */}
                            <Box position="relative" mt="8" pt="6" borderTop="1px" borderColor={borderColor}>
                                <Box position="absolute" top="15px" left="0" w="full" h="2px" bg={bgStepperLines} zIndex={0} />
                                <Flex justify="space-between" align="stretch" position="relative" zIndex={1} maxW="container.lg" mx="auto" px="4">
                                    {[
                                        { name: 'Category Selected', status: 'completed' },
                                        { name: 'Item List Viewing', status: 'current' },
                                        { name: 'Details Pending', status: 'pending' },
                                        { name: 'Edit Pending', status: 'pending' },
                                        { name: 'Complete Pending', status: 'pending' }
                                    ].map((step, i) => (
                                        <VStack key={i} spacing="3" cursor="default">
                                            <Flex
                                                align="center"
                                                justify="center"
                                                w="8"
                                                h="8"
                                                rounded="full"
                                                bg={step.status === 'completed' ? bgButton : step.status === 'current' ? bgCard : bgStepperLines}
                                                color={step.status === 'completed' ? colorButton : step.status === 'current' ? textColorMain : 'gray.400'}
                                                border="4px solid"
                                                borderColor={bgMain}
                                                boxShadow={step.status === 'current' ? '0 0 0 2px ' + textColorMain : 'none'}
                                                transition="all 0.3s"
                                            >
                                                {step.status === 'completed' ? <Icon as={CheckCircleIcon} w="4" h="4" /> :
                                                    step.status === 'current' ? <Box w="2.5" h="2.5" rounded="full" bg={bgButton} /> :
                                                        <Box w="2" h="2" rounded="full" bg="gray.500" />}
                                            </Flex>
                                            <Box textAlign="center">
                                                <Text
                                                    fontSize="xs"
                                                    fontWeight="semibold"
                                                    color={step.status === 'completed' || step.status === 'current' ? textColorMain : textColorMuted}
                                                    transition="color 0.3s"
                                                >
                                                    {step.name.split(' ')[0]}
                                                </Text>
                                                <Text
                                                    fontSize="10px"
                                                    color={textColorMuted}
                                                    mt="0.5"
                                                >
                                                    {step.name.split(' ').slice(1).join(' ')}
                                                </Text>
                                            </Box>
                                        </VStack>
                                    ))}
                                </Flex>
                            </Box>
                        </>
                    ) : (
                        <Card size="sm" bg={bgCard} variant="outline" borderColor={borderColor}>
                            <CardBody py="3">
                                <Flex align="center" justify="space-between" width="full">
                                    <Flex align="center" gap={{ base: "4", md: "8" }} overflowX="auto" pb={{ base: "2", md: "0" }}>
                                        <Box flexShrink={0}>
                                            <Flex align="baseline" gap="2">
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>TOTAL SKUs:</Text>
                                                <Text fontSize="lg" fontWeight="bold" lineHeight="1.2" color={textColorMain}>450</Text>
                                            </Flex>
                                        </Box>
                                        <Divider orientation="vertical" h="8" display={{ base: "none", md: "block" }} />
                                        <Box flexShrink={0}>
                                            <Flex align="baseline" gap="2">
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>AVAILABLE:</Text>
                                                <Text fontSize="lg" fontWeight="bold" lineHeight="1.2" color={textColorMain}>400</Text>
                                            </Flex>
                                        </Box>
                                        <Divider orientation="vertical" h="8" display={{ base: "none", md: "block" }} />
                                        <Box flexShrink={0}>
                                            <Flex align="baseline" gap="2">
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>LOW STOCK:</Text>
                                                <Text fontSize="lg" fontWeight="bold" lineHeight="1.2" color="yellow.500">15</Text>
                                            </Flex>
                                        </Box>
                                        <Divider orientation="vertical" h="8" display={{ base: "none", md: "block" }} />
                                        <Box flexShrink={0}>
                                            <Flex align="baseline" gap="2">
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>OUT OF STOCK:</Text>
                                                <Text fontSize="lg" fontWeight="bold" lineHeight="1.2" color="red.500">8</Text>
                                            </Flex>
                                        </Box>
                                    </Flex>

                                    <Flex align="center" gap="3" ml="auto" mr="4" display={{ base: "none", md: "flex" }}>
                                        <VStack align="flex-end" spacing="0">
                                            <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={textColorMuted}>Current Phase</Text>
                                            <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Item List Viewing</Text>
                                        </VStack>
                                        <Flex align="center" justify="center" w="8" h="8" borderRadius="full" border="2px solid" borderColor={textColorMain} bg={bgCard}>
                                            <Box w="2.5" h="2.5" borderRadius="full" bg={textColorMain} />
                                        </Flex>
                                    </Flex>

                                    <Divider orientation="vertical" h="12" display={{ base: "none", xl: "block" }} mx="4" />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        flexDirection="column"
                                        gap="1"
                                        h="auto"
                                        py="2"
                                        color="gray.500"
                                        _hover={{ color: textColorMain, bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
                                        onClick={() => setIsSummaryExpanded(true)}
                                    >
                                        <ChevronDownIcon />
                                        <Text fontSize="10px" fontWeight="medium">Show Details</Text>
                                    </Button>
                                </Flex>
                            </CardBody>
                        </Card>
                    )}
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
                                                    bg={selectedItem.id === item.id ? useColorModeValue('blue.50', 'whiteAlpha.100') : 'transparent'}
                                                    _hover={{ bg: selectedItem.id === item.id ? useColorModeValue('blue.50', 'whiteAlpha.100') : useColorModeValue('gray.50', 'gray.700') }}
                                                    borderLeft={selectedItem.id === item.id ? '3px solid' : '3px solid transparent'}
                                                    borderLeftColor={selectedItem.id === item.id ? "blue.500" : "transparent"}
                                                    transition="all 0.2s"
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
                        <Card h="100%" overflow="hidden" bg={useColorModeValue('white', 'gray.800')} borderColor={useColorModeValue('gray.200', 'gray.700')} display="flex" flexDirection="column">
                            <Tabs display="flex" flexDirection="column" h="100%" defaultIndex={0} colorScheme="blue">
                                <Flex borderBottom="1px" borderColor={useColorModeValue('gray.100', 'gray.700')} align="center" justify="space-between" px="4">
                                    <TabList borderBottom="none">
                                        <Tab fontSize="sm" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500', borderBottom: '2px solid' }} px="4" py="3">Order Info</Tab>
                                        <Tab fontSize="sm" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500', borderBottom: '2px solid' }} px="4" py="3">Activity Stream</Tab>
                                    </TabList>
                                    <Flex align="center" gap="1">
                                        <IconButton aria-label="Edit Details" icon={<Icon as={FaEdit} />} size="xs" variant="ghost" color="gray.500" onClick={() => setIsDocumentModalOpen(true)} />
                                        <IconButton aria-label="Export PDF" icon={<Icon as={FaDownload} />} size="xs" variant="ghost" color="gray.500" />
                                        <IconButton aria-label="Ship Now" icon={<Icon as={FaTruck} />} size="xs" variant="ghost" color="gray.500" />
                                        <Box position="relative">
                                            <IconButton aria-label="AI Diagnosis" icon={<Icon as={FaRobot} color="purple.500" boxSize="18px" />} size="xs" variant="ghost" onClick={onAiOpen} />
                                            <Box position="absolute" top="1" right="1" display="flex" h="2" w="2">
                                                <Box position="absolute" display="inline-flex" h="full" w="full" borderRadius="full" bg="purple.400" opacity="0.75" animation="ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" />
                                                <Box position="relative" display="inline-flex" borderRadius="full" h="2" w="2" bg="purple.500" />
                                            </Box>
                                        </Box>
                                        <Box w="1px" h="16px" bg="gray.300" mx="1" />
                                        <IconButton aria-label="More" icon={<Icon as={FaEllipsisH} />} size="xs" variant="ghost" color="gray.500" />
                                    </Flex>
                                </Flex>

                                <TabPanels flex="1" overflow="hidden">
                                    {/* Order Info Panel */}
                                    <TabPanel p="0" h="100%" overflowY="auto">
                                        <CardBody>
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
                                                                <Text fontSize="xs" fontWeight="bold" color={textColorMain}>AI Suggestions</Text>
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
                                                                        <Flex p="2" bg={bgCard} borderWidth="1px" borderColor="gray.200" borderRadius="md" _hover={{ borderColor: 'purple.300' }} cursor="pointer" transition="all 0.2s">
                                                                            <Box mt="1" mr="2" w="3" h="3" borderRadius="full" border="1px" borderColor="gray.400" />
                                                                            <Box>
                                                                                <Text fontSize="xs" fontWeight="medium" color="purple.600">Premium Upgrade</Text>
                                                                                <Text fontSize="10px" color="gray.500">+ High Durability Finish</Text>
                                                                            </Box>
                                                                        </Flex>
                                                                    </VStack>
                                                                    <Button mt="3" w="full" size="xs" colorScheme="blue">Apply Selection</Button>
                                                                </Box>
                                                            ) : (
                                                                /* Data Fix / Warning */
                                                                <Box bg={useColorModeValue('orange.50', 'whiteAlpha.100')} p="3" borderRadius="md" border="1px" borderColor={useColorModeValue('orange.100', 'whiteAlpha.200')}>
                                                                    <Flex gap="2">
                                                                        <WarningIcon color="orange.500" mt="1" />
                                                                        <Box width="100%">
                                                                            <Text fontSize="xs" fontWeight="semibold" color={useColorModeValue('orange.800', 'orange.200')}>Database Discrepancy</Text>
                                                                            <Text fontSize="10px" color={useColorModeValue('orange.600', 'orange.300')} mt="1">Local stock count differs from remote warehouse log.</Text>

                                                                            <Flex align="center" justify="space-between" mt="2" mb="3" px="2">
                                                                                <Box textAlign="center">
                                                                                    <Text fontSize="10px" color="gray.500" textTransform="uppercase">Local</Text>
                                                                                    <Text fontSize="sm" fontWeight="bold">{selectedItem.stock}</Text>
                                                                                </Box>
                                                                                <Icon as={RepeatIcon} color="gray.400" />
                                                                                <Box textAlign="center">
                                                                                    <Text fontSize="10px" color="gray.500" textTransform="uppercase">Remote</Text>
                                                                                    <Text fontSize="sm" fontWeight="bold" color="orange.500">{(selectedItem.stock || 0) + 5}</Text>
                                                                                </Box>
                                                                            </Flex>

                                                                            <Button w="full" size="xs" colorScheme="orange">Sync & Fix</Button>
                                                                            {!isManualFixMode && (
                                                                                <Button
                                                                                    size="xs"
                                                                                    variant="link"
                                                                                    colorScheme="orange"
                                                                                    textDecoration="underline"
                                                                                    w="full"
                                                                                    mt="1"
                                                                                    onClick={() => setIsManualFixMode(true)}
                                                                                >
                                                                                    Resolve Manually
                                                                                </Button>
                                                                            )}
                                                                        </Box>
                                                                    </Flex>
                                                                    {isManualFixMode && (
                                                                        <Box mt="3">
                                                                            <RadioGroup onChange={(val: any) => setResolutionMethod(val)} value={resolutionMethod}>
                                                                                <Stack direction="column" spacing="2">
                                                                                    <Box p="2" borderWidth="1px" borderRadius="md" borderColor={resolutionMethod === 'local' ? 'orange.500' : 'inherit'} bg={resolutionMethod === 'local' ? useColorModeValue('white', 'whiteAlpha.100') : 'transparent'}>
                                                                                        <Radio value="local" colorScheme="orange" size="sm">
                                                                                            <Box ml="1">
                                                                                                <Text fontSize="xs" fontWeight="bold">Keep Local Value</Text>
                                                                                                <Text fontSize="10px" color="gray.500">{selectedItem.stock} items</Text>
                                                                                            </Box>
                                                                                        </Radio>
                                                                                    </Box>
                                                                                    <Box p="2" borderWidth="1px" borderRadius="md" borderColor={resolutionMethod === 'remote' ? 'orange.500' : 'inherit'} bg={resolutionMethod === 'remote' ? useColorModeValue('white', 'whiteAlpha.100') : 'transparent'}>
                                                                                        <Radio value="remote" colorScheme="orange" size="sm">
                                                                                            <Box ml="1">
                                                                                                <Text fontSize="xs" fontWeight="bold">Accept Warehouse Value</Text>
                                                                                                <Text fontSize="10px" color="gray.500">{(selectedItem.stock || 0) + 5} items</Text>
                                                                                            </Box>
                                                                                        </Radio>
                                                                                    </Box>
                                                                                    <Box p="2" borderWidth="1px" borderRadius="md" borderColor={resolutionMethod === 'custom' ? 'orange.500' : 'inherit'} bg={resolutionMethod === 'custom' ? useColorModeValue('white', 'whiteAlpha.100') : 'transparent'}>
                                                                                        <Radio value="custom" colorScheme="orange" size="sm">
                                                                                            <Text ml="1" fontSize="xs" fontWeight="bold">Custom Value</Text>
                                                                                        </Radio>
                                                                                        {resolutionMethod === 'custom' && (
                                                                                            <Input
                                                                                                size="xs"
                                                                                                mt="2"
                                                                                                placeholder="#"
                                                                                                bg={useColorModeValue('white', 'gray.800')}
                                                                                                value={customValue}
                                                                                                onChange={(e) => setCustomValue(e.target.value)}
                                                                                            />
                                                                                        )}
                                                                                    </Box>
                                                                                </Stack>
                                                                            </RadioGroup>

                                                                            <Flex gap="2" mt="3">
                                                                                <Button size="xs" flex="1" variant="ghost" onClick={() => setIsManualFixMode(false)}>Cancel</Button>
                                                                                <Button
                                                                                    size="xs"
                                                                                    flex="1"
                                                                                    colorScheme="orange"
                                                                                    onClick={() => {
                                                                                        alert(`Fixed with: ${resolutionMethod === 'custom' ? customValue : (resolutionMethod === 'remote' ? (selectedItem.stock + 5) : selectedItem.stock)}`)
                                                                                        setIsManualFixMode(false)
                                                                                    }}
                                                                                >
                                                                                    Confirm Fix
                                                                                </Button>
                                                                            </Flex>
                                                                        </Box>
                                                                    )}
                                                                </Box>
                                                            )}
                                                        </Collapse>
                                                    </Box>
                                                )}

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

                                                {/* Action Required */}
                                                <Box>
                                                    <Flex justify="space-between" mb="2" align="center">
                                                        <Text fontSize="sm" fontWeight="medium">Action Required</Text>
                                                    </Flex>
                                                    <Box pl="4" borderLeft="1px" borderColor="gray.200" ml="2">
                                                        <VStack spacing="3" align="stretch">
                                                            <Button size="sm" bg={poButtonBg} color={poButtonColor} _hover={{ bg: poButtonHover }} onClick={() => setIsPOModalOpen(true)}>Create Purchase Order</Button>
                                                            <Button size="sm" variant="outline" borderColor={borderColor} color={textColorMuted}>Send Acknowledgment</Button>
                                                        </VStack>
                                                    </Box>
                                                </Box>

                                            </VStack>
                                        </CardBody>
                                    </TabPanel>

                                    {/* Activity Stream Panel */}
                                    <TabPanel p="0" h="100%" overflow="hidden">
                                        <Flex h="100%">
                                            {/* Chat Area */}
                                            <Flex direction="column" flex="1" borderRight="1px" borderColor={borderColor}>
                                                <Box flex="1" overflowY="auto" p="4">
                                                    <VStack spacing="4" align="stretch">
                                                        <Flex justify="center"><Badge colorScheme="gray" variant="solid" borderRadius="full" px="3" fontSize="xs">Today, 9:23 AM</Badge></Flex>
                                                        {messages.map((msg) => (
                                                            <Flex key={msg.id} gap="3" direction={msg.type === 'user' ? 'row-reverse' : 'row'}>
                                                                {msg.type !== 'user' && (
                                                                    msg.type === 'system' ? (
                                                                        <Flex align="center" justify="center" w="8" h="8" borderRadius="full" bg={useColorModeValue('gray.200', 'gray.600')}>
                                                                            <Icon as={RepeatIcon} color="gray.500" />
                                                                        </Flex>
                                                                    ) : (
                                                                        <Avatar
                                                                            size="sm"
                                                                            name={msg.sender}
                                                                            src={msg.avatar === 'AI' ? undefined : msg.avatar}
                                                                            bg={msg.type === 'ai' ? 'purple.100' : 'gray.200'}
                                                                            color={msg.type === 'ai' ? 'purple.600' : 'gray.600'}
                                                                            icon={msg.type === 'ai' ? <Icon as={FaRobot} /> : undefined}
                                                                        />
                                                                    )
                                                                )}

                                                                <Box maxW="85%">
                                                                    {msg.type === 'system' ? (
                                                                        <Text fontSize="sm" color="gray.500">
                                                                            <Text as="span" fontWeight="bold">{msg.sender}</Text> {msg.content.replace('System ', '')}
                                                                        </Text>
                                                                    ) : (
                                                                        <Box>
                                                                            <Flex align="center" gap="2" mb="1" justify={msg.type === 'user' ? 'flex-end' : 'flex-start'}>
                                                                                {msg.type !== 'user' && <Text fontSize="sm" fontWeight="bold" color={msg.type === 'ai' ? 'purple.500' : textColorMain}>{msg.sender}</Text>}
                                                                                <Text fontSize="xs" color="gray.500">{msg.time}</Text>
                                                                                {msg.type === 'user' && <Text fontSize="sm" fontWeight="bold" color={textColorMain}>{msg.sender}</Text>}
                                                                            </Flex>
                                                                            <Box
                                                                                bg={msg.type === 'user' ? 'blue.500' : (msg.type === 'ai' ? useColorModeValue('purple.50', 'purple.900') : bgCard)}
                                                                                color={msg.type === 'user' ? 'white' : textColorMain}
                                                                                p="3"
                                                                                borderRadius="lg"
                                                                                borderWidth={msg.type === 'user' ? 0 : '1px'}
                                                                                borderColor={msg.type === 'ai' ? 'purple.200' : borderColor}
                                                                                boxShadow="sm"
                                                                            >
                                                                                <Text fontSize="sm">{msg.content}</Text>
                                                                                {msg.type === 'ai' && (
                                                                                    <HStack mt="3" spacing="2">
                                                                                        <Button size="xs" colorScheme="purple">Create Task</Button>
                                                                                        <Button size="xs" variant="ghost" colorScheme="purple">Dismiss</Button>
                                                                                    </HStack>
                                                                                )}
                                                                            </Box>
                                                                        </Box>
                                                                    )}
                                                                </Box>

                                                                {msg.type === 'user' && (
                                                                    <Avatar size="sm" name={msg.sender} src={msg.avatar} bg="blue.100" color="blue.600" />
                                                                )}
                                                            </Flex>
                                                        ))}
                                                    </VStack>
                                                </Box>

                                                {/* Input Area */}
                                                <Box p="4" bg={bgCard} borderTop="1px" borderColor={borderColor}>
                                                    <HStack>
                                                        <IconButton size="sm" aria-label="Attach" icon={<AttachmentIcon />} variant="ghost" color="gray.500" />
                                                        <Input placeholder="Type a message..." size="sm" borderRadius="full" bg={useColorModeValue('gray.50', 'gray.700')} border="none" />
                                                        <IconButton size="sm" aria-label="Send" icon={<Icon as={FaPaperPlane} />} colorScheme="blue" borderRadius="full" />
                                                    </HStack>
                                                </Box>
                                            </Flex>

                                            {/* Sidebar */}
                                            <Box w="72" display={{ base: 'none', '2xl': 'block' }} bg={bgMain} borderLeft="1px" borderColor={borderColor}>
                                                <VStack align="stretch" spacing="0" h="100%">
                                                    <Box p="4" borderBottom="1px" borderColor={borderColor}>
                                                        <Heading size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">Collaborators</Heading>
                                                    </Box>
                                                    <VStack align="stretch" spacing="3" p="4" flex="1" overflowY="auto">
                                                        {collaborators.map((c, i) => (
                                                            <HStack key={i}>
                                                                <Box position="relative">
                                                                    <Avatar size="xs" name={c.name} src={c.avatar === 'AI' ? undefined : c.avatar} icon={c.avatar === 'AI' ? <Icon as={FaRobot} /> : undefined} bg={c.avatar === 'AI' ? 'purple.100' : undefined} color={c.avatar === 'AI' ? 'purple.600' : undefined} />
                                                                    <Box position="absolute" bottom="0" right="0" w="2" h="2" borderRadius="full" bg={c.status === 'online' ? 'green.400' : 'gray.400'} border="2px solid white" />
                                                                </Box>
                                                                <Box flex="1" minW="0">
                                                                    <Text fontSize="sm" fontWeight="medium" noOfLines={1} color={textColorMain}>{c.name}</Text>
                                                                    <Text fontSize="xs" color="gray.500">{c.role}</Text>
                                                                </Box>
                                                            </HStack>
                                                        ))}
                                                        <Button size="xs" variant="ghost" justifyContent="flex-start" leftIcon={<AddIcon />} color="gray.500">Invite New</Button>
                                                    </VStack>

                                                    <Divider />

                                                    <Box p="4" borderBottom="1px" borderColor={borderColor}>
                                                        <Heading size="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">Shared Docs</Heading>
                                                    </Box>
                                                    <VStack align="stretch" spacing="2" p="4">
                                                        {documents.map((doc, i) => (
                                                            <HStack key={i} p="2" borderRadius="md" _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }} cursor="pointer">
                                                                <Flex w="8" h="8" bg={useColorModeValue('blue.50', 'blue.900')} color="blue.500" align="center" justify="center" borderRadius="md">
                                                                    <Icon as={FaClipboardList} boxSize="3" />
                                                                </Flex>
                                                                <Box flex="1" minW="0">
                                                                    <Text fontSize="xs" fontWeight="medium" noOfLines={1} color={textColorMain}>{doc.name}</Text>
                                                                    <Text fontSize="10px" color="gray.500">{doc.size} • {doc.uploaded}</Text>
                                                                </Box>
                                                            </HStack>
                                                        ))}
                                                        <Button size="xs" variant="outline" borderStyle="dashed" w="full" leftIcon={<DownloadIcon />}>Upload File</Button>
                                                    </VStack>
                                                </VStack>
                                            </Box>
                                        </Flex>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Card>
                    </Box>
                </Grid>

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

                {/* AI Diagnosis Modal */}
                <Modal isOpen={isAiOpen} onClose={onAiClose} isCentered size="md">
                    <ModalOverlay backdropFilter="blur(4px)" />
                    <ModalContent bg={bgCard}>
                        <ModalHeader color={textColorMain}>
                            <Flex align="center" gap="2">
                                <StarIcon color="purple.500" />
                                <Text>AI Diagnosis & Suggestions</Text>
                            </Flex>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb="6">
                            <VStack spacing="4" align="stretch">
                                {/* Informative Suggestion */}
                                <Box bg={useColorModeValue('blue.50', 'blue.900')} p="4" borderRadius="md" border="1px solid" borderColor={useColorModeValue('blue.100', 'blue.700')}>
                                    <Flex gap="3">
                                        <Icon as={WarningIcon} w="5" h="5" color="blue.500" mt="1" />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="sm" color={useColorModeValue('blue.800', 'blue.100')}>Category Ambiguity</Text>
                                            <Text fontSize="xs" color={useColorModeValue('blue.700', 'blue.200')} mt="1">
                                                The item '{selectedItem.name}' matches patterns for both 'Office' and 'Home' categories. Please verify classification.
                                            </Text>
                                            <Flex gap="2" mt="3">
                                                <Button size="xs" colorScheme="blue" variant="outline" bg={useColorModeValue('white', 'transparent')}>Keep 'Office'</Button>
                                                <Button size="xs" colorScheme="blue" variant="outline" bg={useColorModeValue('white', 'transparent')}>Move to 'Home'</Button>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Box>

                                {/* Data Fix Suggestion */}
                                <Box bg={useColorModeValue('orange.50', 'orange.900')} p="4" borderRadius="md" border="1px solid" borderColor={useColorModeValue('orange.100', 'orange.700')}>
                                    <Flex gap="3">
                                        <Icon as={RepeatIcon} w="5" h="5" color="orange.500" mt="1" />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="sm" color={useColorModeValue('orange.800', 'orange.100')}>Stock Sync Required</Text>
                                            <Text fontSize="xs" color={useColorModeValue('orange.700', 'orange.200')} mt="1">
                                                Local stock count ({selectedItem.stock}) differs from Warehouse Log ({(selectedItem.stock || 0) + 5}).
                                            </Text>
                                            <Button size="xs" colorScheme="orange" mt="3">Synchronize Database</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                {/* Document Preview Modal */}
                <Modal isOpen={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)} isCentered size="xl">
                    <ModalOverlay backdropFilter="blur(2px)" />
                    <ModalContent bg={useColorModeValue('white', 'gray.800')} h="80vh">
                        <ModalHeader borderBottom="1px" borderColor={borderColor}>
                            <Flex justify="space-between" align="center">
                                <Flex align="center" gap="2">
                                    <Icon as={FaClipboardList} color="gray.500" />
                                    <Text fontSize="md">Order Document Preview</Text>
                                </Flex>
                                <Flex gap="2" mr={8}>
                                    <IconButton aria-label="Zoom In" icon={<AddIcon />} size="xs" variant="ghost" />
                                    <IconButton aria-label="Zoom Out" icon={<Box h="2px" w="10px" bg="currentColor" />} size="xs" variant="ghost" />
                                </Flex>
                            </Flex>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody bg={useColorModeValue('gray.100', 'gray.900')} p="6" overflow="auto">
                            <Box
                                bg="white"
                                color="black"
                                w="full"
                                minH="800px"
                                boxShadow="lg"
                                p="12"
                                mx="auto"
                                maxW="210mm" // A4 width
                            >
                                <VStack align="stretch" spacing="8">
                                    <Flex justify="space-between" align="center" borderBottom="2px solid black" pb="4">
                                        <Heading size="md">PURCHASE ORDER</Heading>
                                        <VStack align="flex-end" spacing="0">
                                            <Text fontWeight="bold" fontSize="lg">STRATA INC.</Text>
                                            <Text fontSize="xs">123 Innovation Dr.</Text>
                                            <Text fontSize="xs">Tech City, CA 94000</Text>
                                        </VStack>
                                    </Flex>

                                    <Flex justify="space-between" align="flex-start">
                                        <Box>
                                            <Text fontSize="xs" fontWeight="bold" color="gray.600" mb="1">VENDOR</Text>
                                            <Text fontWeight="bold">OfficeSupplies Co.</Text>
                                            <Text fontSize="sm">555 Supplier Lane</Text>
                                            <Text fontSize="sm">Logistics Park, NY 10001</Text>
                                        </Box>
                                        <Box textAlign="right">
                                            <Flex justify="space-between" w="200px" mb="1">
                                                <Text fontSize="sm" fontWeight="bold" color="gray.600">PO #:</Text>
                                                <Text fontSize="sm" fontWeight="bold">PO-2025-001</Text>
                                            </Flex>
                                            <Flex justify="space-between" w="200px" mb="1">
                                                <Text fontSize="sm" fontWeight="bold" color="gray.600">DATE:</Text>
                                                <Text fontSize="sm">Jan 12, 2026</Text>
                                            </Flex>
                                            <Flex justify="space-between" w="200px">
                                                <Text fontSize="sm" fontWeight="bold" color="gray.600">DUE DATE:</Text>
                                                <Text fontSize="sm">Feb 12, 2026</Text>
                                            </Flex>
                                        </Box>
                                    </Flex>

                                    <TableContainer>
                                        <Table variant="simple" size="sm">
                                            <Thead bg="gray.100">
                                                <Tr>
                                                    <Th color="black">ITEM</Th>
                                                    <Th color="black" isNumeric>QTY</Th>
                                                    <Th color="black" isNumeric>UNIT PRICE</Th>
                                                    <Th color="black" isNumeric>TOTAL</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight="bold">{selectedItem.name}</Text>
                                                        <Text fontSize="xs" color="gray.600">{selectedItem.id}</Text>
                                                    </Td>
                                                    <Td isNumeric>50</Td>
                                                    <Td isNumeric>$45.00</Td>
                                                    <Td isNumeric fontWeight="bold">$2,250.00</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight="bold">Shipping & Handling</Text>
                                                    </Td>
                                                    <Td isNumeric>-</Td>
                                                    <Td isNumeric>$150.00</Td>
                                                    <Td isNumeric>$150.00</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>

                                    <Flex justify="flex-end" pt="4">
                                        <Box w="250px">
                                            <Flex justify="space-between" mb="2">
                                                <Text fontSize="sm" color="gray.600">Subtotal:</Text>
                                                <Text fontSize="sm" fontWeight="bold">$2,400.00</Text>
                                            </Flex>
                                            <Flex justify="space-between" mb="4" pb="4" borderBottom="1px solid" borderColor="gray.300">
                                                <Text fontSize="sm" color="gray.600">Tax (8%):</Text>
                                                <Text fontSize="sm" fontWeight="bold">$192.00</Text>
                                            </Flex>
                                            <Flex justify="space-between" align="center">
                                                <Text fontSize="md" fontWeight="bold">TOTAL:</Text>
                                                <Text fontSize="xl" fontWeight="bold" color="blue.600">$2,592.00</Text>
                                            </Flex>
                                        </Box>
                                    </Flex>

                                    <Box pt="12" pb="4">
                                        <Text fontSize="xs" color="gray.500" borderTop="1px solid" borderColor="gray.300" pt="2">
                                            Authorized Signature
                                        </Text>
                                    </Box>
                                </VStack>
                            </Box>
                        </ModalBody>
                        <ModalFooter bg={useColorModeValue('white', 'gray.800')} borderTop="1px" borderColor={borderColor}>
                            <Button variant="ghost" mr={3} onClick={() => setIsDocumentModalOpen(false)}>Close</Button>
                            <Button leftIcon={<DownloadIcon />} colorScheme="blue">Download PDF</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Flex>
    )
}

function NavItem({ icon, label, isActive }: { icon: any, label: string, isActive?: boolean }) {
    const activeBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
    const activeColor = useColorModeValue('blue.600', 'blue.200')
    const hoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')

    return (
        <Button
            variant="ghost"
            rounded="full"
            px="4"
            h="36px"
            bg={isActive ? activeBg : 'transparent'}
            color={isActive ? activeColor : 'gray.500'}
            _hover={{ bg: hoverBg, '.nav-label': { maxW: '200px', opacity: 1, ml: 2 } }}
            gap="2"
            sx={{ gap: '0.5rem' }}
            display="flex"
            alignItems="center"
            overflow="hidden"
            transition="all 0.3s"
            className="group"
        >
            <Box as={icon} size="16px" />
            <Box
                as="span"
                className="nav-label"
                maxW={isActive ? '100px' : '0'}
                opacity={isActive ? 1 : 0}
                whiteSpace="nowrap"
                transition="all 0.3s"
                fontSize="sm"
                fontWeight="medium"
            >
                {label}
            </Box>
        </Button>
    )
}
