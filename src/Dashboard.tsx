import { useState, useMemo, Fragment } from 'react'
import {
    Box, Flex, Grid, Heading, Text, Button, Input, InputGroup, InputLeftElement,
    Avatar, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Card, CardBody, CardHeader, VStack, Divider, Tag, SimpleGrid, ButtonGroup, useColorMode, useColorModeValue, Collapse,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, Tooltip as ChakraTooltip, useDisclosure,
    Menu, MenuButton, MenuList, MenuItem, MenuDivider, Checkbox, CheckboxGroup, Stack, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Portal
} from '@chakra-ui/react'
import {
    ChevronDownIcon, SearchIcon, BellIcon, SettingsIcon, CheckCircleIcon,
    ChevronRightIcon, EmailIcon, ViewIcon, EditIcon, DeleteIcon,
    MoonIcon, SunIcon, ChevronUpIcon, ArrowForwardIcon, CopyIcon, AddIcon, CalendarIcon
} from '@chakra-ui/icons'
import { FaHome, FaExclamationTriangle, FaBox, FaIndustry, FaClipboardList, FaTruck, FaTh, FaList, FaSignOutAlt, FaUser, FaMapMarkerAlt, FaCheckCircle, FaClock, FaChartLine, FaCalendar } from 'react-icons/fa'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", avatar: "AutoManfacture Co.", colorScheme: 'gray' },
    { id: "#ORD-2054", customer: "TechDealer Solutions", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", avatar: "TechDealer Solutions", colorScheme: 'blue' },
    { id: "#ORD-2053", customer: "Urban Living Inc.", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", avatar: "Urban Living Inc.", colorScheme: 'green' },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { colorMode, toggleColorMode } = useColorMode()
    const ThemeIcon = colorMode === 'light' ? MoonIcon : SunIcon

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [trackingOrder, setTrackingOrder] = useState<any>(null)
    const [showMetrics, setShowMetrics] = useState(true)
    const [isAppsOpen, setIsAppsOpen] = useState(false)

    // HOOK FIX: Define colors at top level, never inside loops
    const bgHover = useColorModeValue("gray.50", "whiteAlpha.50")
    const bgExpanded = useColorModeValue("blue.50", "whiteAlpha.100")
    const bgCard = useColorModeValue("white", "gray.800") // Updated from gray.900
    const bgStepActive = useColorModeValue("blue.500", "blue.400")
    const bgStepInactive = useColorModeValue("gray.200", "gray.700")
    const bgStepTextActive = "blue.500"
    const bgStepTextInactive = "gray.500"
    const bgStepContainer = useColorModeValue("gray.50", "blackAlpha.200")
    const bgStepLoop = useColorModeValue("gray.50", "whiteAlpha.50")
    const bgTimelineBar = useColorModeValue("gray.200", "gray.600")
    const bgBorder = useColorModeValue("gray.100", "whiteAlpha.100")
    const bgAlertCard = useColorModeValue("orange.50", "whiteAlpha.50")


    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, selectedStatuses])

    const bgMain = useColorModeValue('gray.50', 'gray.900')
    // const bgCard = useColorModeValue('white', 'gray.900') // This is now declared above
    const borderColor = useColorModeValue('gray.200', 'gray.800')
    const textColorMuted = useColorModeValue('gray.500', 'gray.400')
    const textColorMain = useColorModeValue('gray.900', 'white')
    const textColorSecondary = useColorModeValue('gray.600', 'gray.300') // Added
    const chartFill = useColorModeValue('#1A202C', '#E2E8F0')
    const chartStroke = useColorModeValue('#1A202C', '#E2E8F0')

    // Glassmorphism Styles
    const navBorder = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)')
    const navShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.07)"

    return (
        <Box minH="100vh" bg={bgMain} fontFamily="body">
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
                                    transform="translateX(-50%)" /* Chakra transform is reliable in Box */
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
                                                <Text fontSize="xs" fontWeight="medium" color={textColorSecondary} _groupHover={{ color: textColorMain }}>{app.label}</Text>
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


            {/* Main Content */}
            <Box pt="24" pb="12" px={{ base: 4, xl: 8 }} maxW="1400px" mx="auto">
                {/* Page Header */}
                <Flex flexDir={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} mb="8" gap="4">
                    <Box>
                        <Flex align="center" gap="2">
                            <Heading size="lg" fontWeight="bold" bgGradient={useColorModeValue("linear(to-r, gray.900, gray.600)", "linear(to-r, white, gray.400)")} bgClip="text">
                                Operational Overview
                            </Heading>
                        </Flex>
                        <Text color="gray.500" mt="1">Jan 1 - Jan 31, 2025</Text>
                    </Box>
                    <Flex gap="3" align="center">
                        <InputGroup w={{ base: "full", md: "64" }}>
                            <InputLeftElement pointerEvents="none"><SearchIcon color="gray.400" /></InputLeftElement>
                            <Input
                                placeholder="Search everything..."
                                bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.300')}
                                backdropFilter="blur(8px)"
                                border="1px solid"
                                borderColor={borderColor}
                                _focus={{ borderColor: 'blue.400', ring: 'none' }}
                                borderRadius="xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>
                        <IconButton aria-label="Notifications" icon={<BellIcon />} variant="outline" borderColor={borderColor} bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.300')} borderRadius="xl" color="gray.500" />
                    </Flex>
                </Flex>

                {/* KPI Cards */}
                <Collapse in={showMetrics} animateOpacity>
                    <Flex justify="flex-end" mb="2">
                        <Button size="sm" variant="ghost" onClick={() => setShowMetrics(false)} color="gray.500">
                            Hide Details <ChevronUpIcon ml="2" />
                        </Button>
                    </Flex>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6" mb="8">
                        <Card
                            bg={bgCard}
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="2xl"
                            boxShadow="sm"
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardBody>
                                <Flex justify="space-between" align="start">
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" color={textColorMuted} textTransform="uppercase" letterSpacing="wide">Total Inventory</Text>
                                        <Heading size="lg" mt="2" color={textColorMain}>$1.2M</Heading>
                                    </Box>
                                    <Flex p="3" bg={useColorModeValue('blue.50', 'whiteAlpha.100')} rounded="xl" color="blue.500" align="center" justify="center">
                                        <FaBox size="24px" />
                                    </Flex>
                                </Flex>
                                <Flex mt="4" align="center" fontSize="sm" color="green.500">
                                    <FaChartLine />
                                    <Text ml="1" fontWeight="medium">+0.2%</Text>
                                    <Text ml="1" color="gray.500">vs last month</Text>
                                </Flex>
                            </CardBody>
                        </Card>

                        <Card
                            bg={bgCard}
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="2xl"
                            boxShadow="sm"
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardBody>
                                <Flex justify="space-between" align="start">
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" color={textColorMuted} textTransform="uppercase" letterSpacing="wide">Efficiency</Text>
                                        <Heading size="lg" mt="2" color={textColorMain}>88%</Heading>
                                    </Box>
                                    <Flex p="3" bg={useColorModeValue('purple.50', 'whiteAlpha.100')} rounded="xl" color="purple.500" align="center" justify="center">
                                        <FaChartLine size="24px" />
                                    </Flex>
                                </Flex>
                                <Flex mt="4" align="center" fontSize="sm" color="green.500">
                                    <FaChartLine />
                                    <Text ml="1" fontWeight="medium">+3.5%</Text>
                                    <Text ml="1" color="gray.500">vs last month</Text>
                                </Flex>
                            </CardBody>
                        </Card>

                        <Card
                            bg={bgCard}
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="2xl"
                            boxShadow="sm"
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardBody>
                                <Flex justify="space-between" align="start">
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" color={textColorMuted} textTransform="uppercase" letterSpacing="wide">Pending Orders</Text>
                                        <Heading size="lg" mt="2" color={textColorMain}>142</Heading>
                                    </Box>
                                    <Flex p="3" bg={useColorModeValue('orange.50', 'whiteAlpha.100')} rounded="xl" color="orange.500" align="center" justify="center">
                                        <FaClipboardList size="24px" />
                                    </Flex>
                                </Flex>
                                <Flex mt="4" align="center" fontSize="sm" color={textColorMuted}>
                                    <Text fontWeight="medium">-12</Text>
                                    <Text ml="1">vs yesterday</Text>
                                </Flex>
                            </CardBody>
                        </Card>

                        <Card
                            bg={bgCard}
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="2xl"
                            boxShadow="sm"
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            transition="all 0.2s"
                        >
                            <CardBody>
                                <Flex justify="space-between" align="start">
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" color={textColorMuted} textTransform="uppercase" letterSpacing="wide">Low Stock</Text>
                                        <Heading size="lg" mt="2" color={textColorMain}>15</Heading>
                                    </Box>
                                    <Flex p="3" bg={useColorModeValue('red.50', 'whiteAlpha.100')} rounded="xl" color="red.500" align="center" justify="center">
                                        <FaIndustry size="24px" />
                                    </Flex>
                                </Flex>
                                <Flex mt="4" align="center" fontSize="sm" color="red.500">
                                    <Text fontWeight="medium">Requires attention</Text>
                                </Flex>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </Collapse>

                <Collapse in={!showMetrics} animateOpacity>
                    <Card
                        bg={bgCard}
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="2xl"
                        boxShadow="sm"
                        mb="8"
                        py="2"
                    >
                        <CardBody py="3">
                            <Flex align="center" justify="space-between" gap="4" direction={{ base: 'column', lg: 'row' }}>
                                <Flex align="center" gap="6" overflowX="auto" w="full" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <Flex align="center" gap="2" minW="max-content">
                                        <Text fontSize="sm" color={textColorMuted}>Inventory:</Text>
                                        <Text fontSize="md" fontWeight="bold" color={textColorMain}>$1.2M</Text>
                                        <Tag size="sm" colorScheme="green" borderRadius="full">+0.2%</Tag>
                                    </Flex>
                                    <Divider orientation="vertical" h="8" display={{ base: 'none', md: 'block' }} />
                                    <Flex align="center" gap="2" minW="max-content">
                                        <Text fontSize="sm" color={textColorMuted}>Efficiency:</Text>
                                        <Text fontSize="md" fontWeight="bold" color={textColorMain}>88%</Text>
                                        <Tag size="sm" colorScheme="green" borderRadius="full">+3.5%</Tag>
                                    </Flex>
                                    <Divider orientation="vertical" h="8" display={{ base: 'none', md: 'block' }} />
                                    <Flex align="center" gap="2" minW="max-content">
                                        <Text fontSize="sm" color={textColorMuted}>Pending:</Text>
                                        <Text fontSize="md" fontWeight="bold" color={textColorMain}>142</Text>
                                    </Flex>
                                    <Divider orientation="vertical" h="8" display={{ base: 'none', md: 'block' }} />
                                    <Flex align="center" gap="2" minW="max-content">
                                        <Text fontSize="sm" color={textColorMuted}>Low Stock:</Text>
                                        <Text fontSize="md" fontWeight="bold" color={textColorMain}>15</Text>
                                        <Tag size="sm" colorScheme="red" borderRadius="full">Alert</Tag>
                                    </Flex>
                                </Flex>

                                <Divider orientation="vertical" h="12" display={{ base: 'none', lg: 'block' }} mx="2" />

                                <Flex align="center" gap="3" minW="max-content">
                                    <Flex gap="2">
                                        {[
                                            { icon: <AddIcon />, label: "New" },
                                            { icon: <CopyIcon />, label: "Copy" },
                                            { icon: <EmailIcon />, label: "Email" },
                                        ].map((action, i) => (
                                            <Button key={i} size="sm" variant="ghost" leftIcon={action.icon} fontSize="xs" color="gray.500">
                                                {action.label}
                                            </Button>
                                        ))}
                                    </Flex>

                                    <Divider orientation="vertical" h="12" display={{ base: 'none', lg: 'block' }} mx="2" />

                                    <IconButton
                                        aria-label="Show Details"
                                        icon={<ChevronDownIcon />}
                                        size="sm"
                                        variant="ghost"
                                        rounded="full"
                                        onClick={() => setShowMetrics(true)}
                                        title="Show Details"
                                    />
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                </Collapse>



                {/* Main Content Areas */}
                < Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap="6" >
                    {/* Orders Table */}
                    < Box gridColumn={{ lg: 'span 3' }}>
                        <Card boxShadow="lg" bg={bgCard} borderRadius="3xl" border="1px" borderColor={borderColor} overflow="hidden">
                            <CardHeader display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px" borderColor={borderColor} pb="4">
                                <Flex align="center" gap="2">
                                    <Heading size="md" color={textColorMain}>Recent Orders</Heading>
                                    <Tag size="sm" borderRadius="full" colorScheme="gray">Active</Tag>
                                </Flex>
                                <Flex gap="3" align="center">
                                    <ButtonGroup size="sm" isAttached variant="outline" borderRadius="lg">
                                        <IconButton
                                            aria-label="List View"
                                            icon={<FaList />}
                                            isActive={viewMode === 'list'}
                                            onClick={() => setViewMode('list')}
                                            _active={{ bg: useColorModeValue("gray.100", "whiteAlpha.200"), color: "blue.500" }}
                                        />
                                        <IconButton
                                            aria-label="Grid View"
                                            icon={<FaTh />}
                                            isActive={viewMode === 'grid'}
                                            onClick={() => setViewMode('grid')}
                                            _active={{ bg: useColorModeValue("gray.100", "whiteAlpha.200"), color: "blue.500" }}
                                        />
                                    </ButtonGroup>
                                    <Box w="1px" h="20px" bg={borderColor} />
                                    <Menu closeOnSelect={false}>
                                        <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />} variant="outline" borderRadius="lg" fontWeight="medium">
                                            Status
                                        </MenuButton>
                                        <MenuList minW="240px" zIndex="popover" shadow="lg" borderRadius="xl">
                                            <CheckboxGroup
                                                value={selectedStatuses}
                                                onChange={(values) => setSelectedStatuses(values as string[])}
                                            >
                                                <VStack align="start" px="3" py="2" spacing="2">
                                                    {['Pending Review', 'In Production', 'Shipped'].map((status) => (
                                                        <Checkbox key={status} value={status} w="full">
                                                            {status}
                                                        </Checkbox>
                                                    ))}
                                                </VStack>
                                            </CheckboxGroup>
                                            <MenuDivider />
                                            <MenuItem onClick={() => setSelectedStatuses([])} closeOnSelect={true} fontSize="xs" color="blue.500">
                                                Clear Filter
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </CardHeader>

                            <CardBody p="0">
                                {viewMode === 'list' ? (
                                    <TableContainer>
                                        <Table variant="simple">
                                            <Thead bg={useColorModeValue('gray.50', 'whiteAlpha.50')}>
                                                <Tr>
                                                    <Th>Order ID</Th>
                                                    <Th>Customer</Th>
                                                    <Th>Amount</Th>
                                                    <Th>Status</Th>
                                                    <Th>Date</Th>
                                                    <Th isNumeric>Actions</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {filteredOrders.map((order) => (
                                                    <Fragment key={order.id}>
                                                        <Tr
                                                            cursor="pointer"
                                                            _hover={{ bg: bgHover }}
                                                            bg={expandedIds.has(order.id) ? bgExpanded : undefined}
                                                            onClick={() => toggleExpand(order.id)}
                                                            transition="background 0.2s"
                                                        >
                                                            <Td fontWeight="bold" color={textColorMain} display="flex" alignItems="center" gap={2}>
                                                                {expandedIds.has(order.id) ? <ChevronDownIcon color="blue.500" /> : <ChevronRightIcon color="gray.400" />}
                                                                {order.id}
                                                            </Td>
                                                            <Td>
                                                                <Flex align="center" gap="2">
                                                                    <Avatar size="xs" name={order.avatar} bg="gray.200" color="gray.600" />
                                                                    <Text fontSize="sm" fontWeight="medium">{order.customer}</Text>
                                                                </Flex>
                                                            </Td>
                                                            <Td color="gray.500">{order.amount}</Td>
                                                            <Td><Tag size="sm" borderRadius="full" variant="subtle" colorScheme={order.colorScheme}>{order.status}</Tag></Td>
                                                            <Td color="gray.500">{order.date}</Td>
                                                            <Td isNumeric onClick={(e) => e.stopPropagation()}>
                                                                <Flex justify="end" gap={1}>
                                                                    <IconButton aria-label="View Details" icon={<ViewIcon />} size="xs" variant="ghost" rounded="full" color="gray.400" onClick={onNavigateToDetail} />
                                                                    <IconButton aria-label="Edit" icon={<EditIcon />} size="xs" variant="ghost" rounded="full" color="gray.400" />
                                                                    <Menu isLazy>
                                                                        <MenuButton as={IconButton} aria-label="More" icon={<SettingsIcon />} size="xs" variant="ghost" rounded="full" color="gray.400" />
                                                                        <Portal>
                                                                            <MenuList borderRadius="xl" shadow="lg" zIndex="popover">
                                                                                <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
                                                                                <MenuItem icon={<EmailIcon />}>Contact</MenuItem>
                                                                            </MenuList>
                                                                        </Portal>
                                                                    </Menu>
                                                                </Flex>
                                                            </Td>
                                                        </Tr>
                                                        {expandedIds.has(order.id) && (
                                                            <Tr>
                                                                <Td colSpan={6} p={0}>
                                                                    <Box p={6} bg={bgStepContainer} pl={12}>
                                                                        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                                                                            <VStack align="start" flex="1" spacing={4}>
                                                                                <Flex align="center" gap={3}>
                                                                                    <Avatar icon={<FaUser />} bg="gray.200" color="gray.500" />
                                                                                    <Box>
                                                                                        <Text fontWeight="bold" color={textColorMain}>Sarah Johnson</Text>
                                                                                        <Text fontSize="xs" color="gray.500">Project Manager</Text>
                                                                                    </Box>
                                                                                </Flex>
                                                                                <Divider borderColor={borderColor} />
                                                                                {/* Re-using step visual logic */}
                                                                                <Box w="full" position="relative" py={2}>
                                                                                    <Box position="absolute" top="15px" left="0" w="full" h="2px" bg={bgTimelineBar} />
                                                                                    <Flex justify="space-between" position="relative" zIndex={1}>
                                                                                        {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                                            <Flex key={i} direction="column" align="center" bg={bgStepLoop}>
                                                                                                <Flex
                                                                                                    w={8} h={8} rounded="full" align="center" justify="center"
                                                                                                    bg={i <= 1 ? "blue.500" : "gray.200"}
                                                                                                    color={i <= 1 ? "white" : "gray.400"}
                                                                                                    _dark={{ bg: i <= 1 ? "blue.400" : "gray.700" }}
                                                                                                >
                                                                                                    {i < 1 ? <FaCheckCircle /> : <Box w={2} h={2} rounded="full" bg={i <= 1 ? "white" : "gray.400"} />}
                                                                                                </Flex>
                                                                                                <Text fontSize="xs" mt={2} fontWeight="medium" color={i <= 1 ? "blue.500" : "gray.500"}>{step}</Text>
                                                                                            </Flex>
                                                                                        ))}
                                                                                    </Flex>
                                                                                </Box>
                                                                            </VStack>
                                                                            <Box w={{ base: "full", md: "300px" }}>
                                                                                <Card variant="outline" bg={useColorModeValue("white", "gray.800")} borderColor={borderColor}>
                                                                                    <CardBody p={4}>
                                                                                        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3} textTransform="uppercase">Alert</Text>
                                                                                        <Flex gap={3}>
                                                                                            <FaTruck color="orange" size="20px" />
                                                                                            <Box>
                                                                                                <Text fontSize="sm" fontWeight="bold" color="orange.500">Customs Delay</Text>
                                                                                                <Text fontSize="xs" color="gray.500" mt={1}>Held at port. ETA +24h.</Text>
                                                                                                <Text fontSize="xs" color="blue.500" mt={2} cursor="pointer" onClick={() => setTrackingOrder(order)}>Track Shipment</Text>
                                                                                            </Box>
                                                                                        </Flex>
                                                                                    </CardBody>
                                                                                </Card>
                                                                            </Box>
                                                                        </Flex>
                                                                    </Box>
                                                                </Td>
                                                            </Tr>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4} p="6">
                                        {filteredOrders.map((order) => (
                                            <Card
                                                key={order.id}
                                                variant="outline"
                                                borderColor={expandedIds.has(order.id) ? "blue.400" : borderColor}
                                                boxShadow={expandedIds.has(order.id) ? "0 0 0 1px #4299E1" : "none"}
                                                bg={bgCard}
                                                cursor="pointer"
                                                onClick={() => toggleExpand(order.id)}
                                                transition="all 0.2s"
                                                _hover={{ borderColor: "blue.300" }}
                                                borderRadius="xl"
                                            >
                                                <CardBody p="5">
                                                    <Flex justify="space-between" mb="4">
                                                        <Flex align="center" gap="3">
                                                            <Avatar size="sm" name={order.avatar} bgGradient="linear(to-br, blue.400, purple.500)" color="white" fontWeight="bold" />
                                                            <Box>
                                                                <Text fontWeight="bold" fontSize="sm">{order.customer}</Text>
                                                                <Text fontSize="xs" color="gray.500">{order.id}</Text>
                                                            </Box>
                                                        </Flex>
                                                        <Flex justify="end" gap={1}>
                                                            <IconButton aria-label="View Details" icon={<ViewIcon />} size="xs" variant="ghost" rounded="full" color="gray.400" onClick={(e) => { e.stopPropagation(); onNavigateToDetail(); }} />
                                                            <IconButton aria-label="Edit" icon={<EditIcon />} size="xs" variant="ghost" rounded="full" color="gray.400" onClick={(e) => e.stopPropagation()} />
                                                            <Menu isLazy>
                                                                <MenuButton as={IconButton} aria-label="More" icon={<SettingsIcon />} size="xs" variant="ghost" rounded="full" onClick={(e) => e.stopPropagation()} />
                                                                <Portal>
                                                                    <MenuList borderRadius="xl" shadow="lg" zIndex="popover">
                                                                        <MenuItem icon={<DeleteIcon />} onClick={(e) => e.stopPropagation()}>Delete</MenuItem>
                                                                        <MenuItem icon={<EmailIcon />} onClick={(e) => e.stopPropagation()}>Contact</MenuItem>
                                                                    </MenuList>
                                                                </Portal>
                                                            </Menu>
                                                        </Flex>
                                                    </Flex>

                                                    <VStack align="stretch" spacing="2">
                                                        <Flex justify="space-between" align="center" py="1" borderBottom="1px" borderColor={useColorModeValue("gray.100", "whiteAlpha.100")}>
                                                            <Text fontSize="xs" color="gray.500">Amount</Text>
                                                            <Text fontSize="sm" fontWeight="bold">{order.amount}</Text>
                                                        </Flex>
                                                        <Flex justify="space-between" align="center" py="1" borderBottom="1px" borderColor={useColorModeValue("gray.100", "whiteAlpha.100")}>
                                                            <Text fontSize="xs" color="gray.500">Date</Text>
                                                            <Text fontSize="sm">{order.date}</Text>
                                                        </Flex>
                                                        <Flex justify="space-between" align="center" pt="2">
                                                            <Tag size="sm" borderRadius="full" colorScheme={order.colorScheme}>{order.status}</Tag>
                                                        </Flex>
                                                    </VStack>

                                                    {expandedIds.has(order.id) && (
                                                        <Box mt="4" pt="4" borderTop="1px" borderColor={borderColor}>
                                                            <VStack align="stretch" spacing="4">
                                                                <Flex align="center" gap={3}>
                                                                    <Avatar icon={<FaUser />} bg="gray.200" color="gray.500" size="sm" />
                                                                    <Box>
                                                                        <Text fontWeight="bold" fontSize="sm" color={textColorMain}>Sarah Johnson</Text>
                                                                        <Text fontSize="xs" color="gray.500">Project Manager</Text>
                                                                    </Box>
                                                                </Flex>

                                                                <Divider />

                                                                <Box w="full" position="relative" py={2}>
                                                                    <Box position="absolute" top="12px" left="0" w="full" h="2px" bg={bgTimelineBar} />
                                                                    <Flex justify="space-between" position="relative" zIndex={1}>
                                                                        {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                            <Flex key={i} direction="column" align="center" bg={bgCard} px="1">
                                                                                <Flex
                                                                                    w={6} h={6} rounded="full" align="center" justify="center"
                                                                                    bg={i <= 1 ? "blue.500" : "gray.200"}
                                                                                    color={i <= 1 ? "white" : "gray.400"}
                                                                                    _dark={{ bg: i <= 1 ? "blue.400" : "gray.700" }}
                                                                                >
                                                                                    {i < 1 ? <FaCheckCircle size="12px" /> : <Box w={1.5} h={1.5} rounded="full" bg={i <= 1 ? "white" : "gray.400"} />}
                                                                                </Flex>
                                                                                <Text fontSize="xs" mt={1} fontWeight="medium" color={i <= 1 ? "blue.500" : "gray.500"}>{step}</Text>
                                                                            </Flex>
                                                                        ))}
                                                                    </Flex>
                                                                </Box>

                                                                <Card variant="outline" bg={bgAlertCard} borderColor={borderColor}>
                                                                    <CardBody p={3}>
                                                                        <Flex gap={3} align="start">
                                                                            <Box color="orange.500" mt="1"><FaExclamationTriangle /></Box>
                                                                            <Box>
                                                                                <Text fontSize="sm" fontWeight="bold" color="orange.700" _dark={{ color: "orange.300" }}>Alert: Customs Delay</Text>
                                                                                <Text fontSize="xs" color="orange.600" _dark={{ color: "orange.400" }} mt={1}>Held at port. ETA +24h.</Text>
                                                                                <Text fontSize="xs" color="blue.500" mt={2} cursor="pointer" onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}>Track Shipment</Text>
                                                                            </Box>
                                                                        </Flex>
                                                                    </CardBody>
                                                                </Card>
                                                            </VStack>
                                                        </Box>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                )}
                            </CardBody>
                        </Card>
                    </Box >

                    {/* Charts */}
                    < Box gridColumn={{ lg: 'span 2' }}>
                        <Card boxShadow="sm" borderRadius="2xl" border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="md" color={textColorMain}>Revenue Trend</Heading>
                            </CardHeader>
                            <CardBody>
                                <Box h="300px" w="100%">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                            <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                            <Tooltip cursor={{ stroke: 'gray.500' }} contentStyle={{ backgroundColor: bgCard, borderColor: borderColor, color: textColorMain, borderRadius: '8px' }} />
                                            <Line type="monotone" dataKey="sales" stroke="#4299E1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="costs" stroke="#A0AEC0" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardBody>
                        </Card>
                    </Box >

                    <Box gridColumn={{ lg: 'span 1' }}>
                        <Card boxShadow="sm" borderRadius="2xl" border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="md" color={textColorMain}>Inventory</Heading>
                            </CardHeader>
                            <CardBody>
                                <Box h="300px" w="100%">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={inventoryData}>
                                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                                            <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: bgCard, borderColor: borderColor, color: textColorMain, borderRadius: '8px' }} />
                                            <Bar dataKey="value" fill="#805AD5" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardBody>
                        </Card>
                    </Box>
                </Grid >
            </Box >

            {/* Modal - Track Order */}
            < Modal isOpen={!!trackingOrder} onClose={() => setTrackingOrder(null)} size="2xl" isCentered >
                <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
                <ModalContent borderRadius="2xl" bg={bgCard}>
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
                        <Text>Tracking Details - {trackingOrder?.id}</Text>
                    </ModalHeader>
                    <ModalCloseButton rounded="full" mt="2" />
                    <ModalBody pb={6}>
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                            {/* Left Col: Timeline */}
                            <Box>
                                <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="gray.500" mb={4} textTransform="uppercase">Shipment Progress</Text>
                                <Box pl={2} borderLeftWidth="1px" borderColor={useColorModeValue("gray.200", "gray.700")} ml={2} position="relative">
                                    <VStack align="stretch" spacing={6}>
                                        {trackingSteps.map((step, idx) => (
                                            <Box key={idx} position="relative" pl={6}>
                                                <Box
                                                    position="absolute"
                                                    left="-5px"
                                                    top="1px"
                                                    w="9px"
                                                    h="9px"
                                                    rounded="full"
                                                    bg={step.completed ? (colorMode === 'light' ? 'gray.900' : 'white') : (colorMode === 'light' ? 'gray.300' : 'gray.600')}
                                                    borderWidth="4px"
                                                    borderColor={colorMode === 'light' ? 'white' : 'gray.900'} // Fixed borderColor match
                                                    boxSizing="content-box"
                                                    sx={{ backgroundColor: step.alert ? 'red.500 !important' : undefined }}
                                                />
                                                <Text fontSize="sm" fontWeight="medium">{step.status}</Text>
                                                <Text fontSize="xs" color="gray.500">{step.date} · {step.location}</Text>
                                            </Box>
                                        ))}
                                    </VStack>
                                </Box>
                            </Box>

                            {/* Right Col */}
                            <Flex direction="column" height="100%">
                                <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="gray.500" mb={4} textTransform="uppercase">Delivery Location</Text>
                                <Flex
                                    bg={useColorModeValue("gray.100", "whiteAlpha.100")}
                                    rounded="2xl"
                                    h="160px"
                                    w="full"
                                    mb={4}
                                    align="center"
                                    justify="center"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                >
                                    <Box textAlign="center">
                                        <FaMapMarkerAlt size="24px" color="gray" style={{ margin: '0 auto 8px' }} />
                                        <Text fontSize="xs" color="gray.500">Map Preview Unavailable</Text>
                                    </Box>
                                </Flex>
                                <Box bg={useColorModeValue("gray.50", "whiteAlpha.50")} p={3} rounded="xl" borderWidth="1px" borderColor={borderColor} mb={6}>
                                    <Text fontSize="xs" fontWeight="medium">Distribution Center NY-05</Text>
                                    <Text fontSize="xs" color="gray.500" mt={1}>45 Industrial Park Dr, Brooklyn, NY 11201</Text>
                                </Box>
                                <Box mt="auto" pt={4} borderTopWidth="1px" borderColor={borderColor}>
                                    <Button width="full" colorScheme="gray" variant="solid" leftIcon={<EmailIcon />} onClick={() => console.log('Contact')}>
                                        Contact Support
                                    </Button>
                                </Box>
                            </Flex>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </Box >
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
            _hover={{ bg: hoverBg, '.nav-label': { maxW: '100px', opacity: 1 } }}
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


