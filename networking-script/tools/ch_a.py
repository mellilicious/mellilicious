from lib import *

def row(ic, tx, w=''):
    return f'<div class="row"><div class="ic {w}">{ic}</div><div class="tx">{tx}</div></div>'

# ---------------------------------------------------------------- 1
def ch1():
    s1 = sec(1, 'What is Networking?', row(icon('intro_globe'),
        '<p>Networking is the process of connecting two or more devices to exchange data and share resources using communication protocols.</p>', 'w16'))
    s2 = sec(2, 'Why Networking matters in DevOps',
        ul(['Enables communication between tools, services &amp; users',
            'Critical for CI/CD, monitoring, logging &amp; automation',
            'Ensures security, performance, scalability &amp; reliability',
            'Foundation of Cloud, Containers &amp; Microservices'], 'ck') + fig('intro_devops', '42mm'))
    s3 = sec(3, 'Client ↔ Server Architecture', fig('intro_cs', '88%') +
        ul(['Client (User/Device) sends a request.', 'Server processes the request.', 'Server sends back the response.']))
    s4 = sec(4, 'LAN, WAN &amp; Internet',
        row(icon('intro_lan'), '<h3>LAN <small>(Local Area Network)</small></h3><p>Connects devices in a small area like home, office, campus.</p>', 'w16') +
        row(icon('intro_wan'), '<h3>WAN <small>(Wide Area Network)</small></h3><p>Connects LANs over large distances like cities, countries.</p>', 'w16') +
        row(icon('intro_inet'), '<h3>Internet</h3><p>Global network of networks that connects the world.</p>', 'w16'))
    s5 = sec(5, 'Real-world Request Flow <small>(Example)</small>', fig('intro_flow', '100%'), 'wide')
    s6 = sec(6, 'Where Networking is used in DevOps', fig('intro_use', '100%'), 'wide')
    boxes = grid('g2', tip('Networking is one of the most frequently tested topics in DevOps interviews.'),
                 rem('Every application request depends on networking before reaching the server.'))
    return chapter(1, 'Introduction to<br>Computer Networking',
                   grid('g2', col(s1, s3), col(s2, s4)) + s5 + s6 + boxes)

# ---------------------------------------------------------------- 2
def ch2():
    dev = lambda ic, n, t, w='': row(icon(ic), f'<h3>{n}</h3><p>{t}</p>', w or 'w28')
    left = col(
        dev('dev_hub', 'Hub', 'A multi-port repeater. It broadcasts data to all connected devices.'),
        dev('dev_switch', 'Switch', 'Connects devices in a LAN. Sends data only to the intended device using MAC addresses.'),
        dev('dev_router', 'Router', 'Connects multiple networks (LAN to WAN). Routes data based on IP addresses.'))
    right = col(
        dev('dev_gateway', 'Gateway', 'Acts as an entry/exit point between different networks or protocols.'),
        dev('dev_modem', 'Modem', 'Modulates and demodulates signals to connect to an ISP over telephone line, cable, or fiber.'),
        dev('dev_firewall', 'Firewall', 'Monitors and controls incoming and outgoing network traffic based on security rules.'))
    s1 = sec(1, 'Common Network Devices', grid('g2', left, right), 'wide')
    t = table(['Device', 'Layer (OSI)', 'Main Function', 'Works On', 'Example Use in QA Insights', 'Key Point'], [
        ['Hub', 'Layer 1', 'Broadcasts data to all ports', 'Bits', 'Legacy lab environments', 'No intelligence, causes collisions'],
        ['Switch', 'Layer 2', 'Forwards data to specific device', 'Frames', 'QA Insights office LAN', 'Uses MAC address table'],
        ['Router', 'Layer 3', 'Routes data between different networks', 'Packets', 'Connects QA Insights LAN to Internet', 'Uses IP address &amp; routing table'],
        ['Gateway', 'Layer 4-7', 'Protocol translation between networks', 'Data / Packets', 'API Gateway in QA Insights applications', 'Different protocols can communicate'],
        ['Modem', 'Layer 1', 'Converts digital ↔ analog signals', 'Bits', 'QA Insights connects to ISP', 'Provides Internet access'],
        ['Firewall', 'Layer 3-7', 'Filters &amp; controls traffic for security', 'Packets / Data', 'Protects QA Insights servers &amp; network', 'Allows or blocks based on rules'],
    ])
    s2 = sec(2, 'Device Comparison Table', t, 'wide')
    s3 = sec(3, 'Interview Tip ⭐',
        '<p>Remember the basic rule:</p><p style="font-size:10.5pt"><b>Hub</b> <span class="r">(Dumb)</span> &lt; <b>Switch</b> <span class="r">(Smart)</span> &lt; '
        '<b>Router</b> <span class="r">(Smarter)</span> &lt; <b>Firewall</b> <span class="r">(Smartest &amp; Secure)</span></p>', 'wide')
    b = rem('Devices work together to deliver the right data to the right place securely and efficiently.')
    return chapter(2, 'Network Devices', s1 + s2 + grid('g21', s3, b))

# ---------------------------------------------------------------- 3
def ch3():
    colors = {7: '#2f6fd0', 6: '#2e8b57', 5: '#e08a1e', 4: '#c4262a', 3: '#8e44ad', 2: '#1f8a9a', 1: '#3b5fc0'}
    def lay(n, name, resp, pdu, dev, ex):
        return [f'<span class="chip" style="background:{colors[n]}">{n}</span>', f'<span class="r">{name}</span>', resp, f'<span class="r">{pdu}</span>', dev, f'<span class="r">{ex}</span>']
    t = table(['Layer (No.)', 'Layer Name', 'Responsibilities', 'Data Unit (PDU)', 'Devices at this Layer', 'Example / Protocols'], [
        lay(7, 'Application Layer', 'Provides network services to user applications.', 'Data', '—', 'HTTP, HTTPS, FTP, SMTP, DNS, SSH, DHCP'),
        lay(6, 'Presentation Layer', 'Handles data format, encryption, compression, translation.', 'Data', '—', 'SSL/TLS, JPEG, ASCII, MPEG'),
        lay(5, 'Session Layer', 'Manages sessions, establishes, maintains &amp; terminates connections.', 'Data', '—', 'NetBIOS, RPC, PPTP'),
        lay(4, 'Transport Layer', 'Provides end-to-end delivery, segmentation, flow control, error control.', 'Segment (TCP)<br>Datagram (UDP)', 'L4 Switch (Load Balancer)', 'TCP, UDP'),
        lay(3, 'Network Layer', 'Logical addressing, routing, path selection, packet forwarding.', 'Packet', 'Router (L3)', 'IP (IPv4, IPv6), ICMP, OSPF, BGP'),
        lay(2, 'Data Link Layer', 'Framing, MAC addressing, error detection, access control.', 'Frame', 'Switch / Bridge (L2)', 'Ethernet, PPP, 802.11, MAC'),
        lay(1, 'Physical Layer', 'Transmits raw bits over physical medium.', 'Bits', 'Hub, Repeater', 'Cables, Connectors, Hubs, Signal Standards'),
    ], first_name=False)
    s1 = sec(1, '7 Layers Overview', t, 'wide')
    s2 = sec(2, 'Data Unit (PDU) Flow', fig('osi_pdu', '92%'))
    mn = fig('osi_mnemo', '66%') + ul(['<span class="r">P</span> – Physical', '<span class="r">D</span> – Data Link', '<span class="r">N</span> – Network',
        '<span class="r">T</span> – Transport', '<span class="r">S</span> – Session', '<span class="r">P</span> – Presentation', '<span class="r">A</span> – Application'], 'dot')
    s3 = sec(3, 'Easy Memory Trick', mn)
    s4 = sec(4, 'Key Takeaways', ul([
        'Upper 3 layers (5–7) focus on application communication.', 'Middle layer (4) ensures reliable end-to-end delivery.',
        'Lower 2 layers (1–2) handle actual data transmission.', 'Data flows down from Layer 7 to 1 when sending and up from 1 to 7 when receiving.'], 'ck'))
    left = col(s2, rem('OSI model is a reference model. Real networks use TCP/IP model in practice.'))
    right = col(s3, s4, tip('Be ready to explain each layer easily with examples and devices. Remember the memory trick under pressure!'))
    return chapter(3, 'OSI Model (7 Layers)', s1 + grid('g2', left, right),
                   lead='The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes how data is transmitted over a network.')

# ---------------------------------------------------------------- 4
def ch4():
    t = table(['Layer (Top to Bottom)', 'Key Responsibilities', 'Example Protocols'], [
        ['4 · Application Layer', 'Provides network services to applications. Handles user interfaces, APIs, data formatting.', '<span class="r">HTTP, HTTPS, FTP, DNS, SSH, SMTP, DHCP</span>'],
        ['3 · Transport Layer', 'End-to-end communication. Segmentation, reliability, port management.', '<span class="r">TCP, UDP</span>'],
        ['2 · Internet Layer', 'Logical addressing and routing of packets across networks.', '<span class="r">IP (IPv4, IPv6), ICMP, ARP</span>'],
        ['1 · Network Access Layer', 'Transmits data on the physical network. Framing, MAC addressing.', '<span class="r">Ethernet, Wi-Fi, PPP</span>'],
    ])
    s1 = sec(1, '4 Layers of TCP/IP Model', t)
    s2 = sec(2, 'OSI vs TCP/IP Model', fig('tcpip_vs', '100%'))
    s3 = sec(3, 'Encapsulation <small>(At Sender)</small>', fig('tcpip_encap', '100%'))
    s4 = sec(4, 'Packet Journey <small>(Sender to Receiver)</small>', fig('tcpip_journey', '100%') +
             rem('Each layer adds its own header (and sometimes trailer) while sending, and removes it while receiving.'))
    s5 = sec(5, 'Why TCP/IP Model is Used?', ul([
        'Simple and easy to understand.', 'Widely adopted across the Internet and all modern networks.',
        'Supports interoperability between different vendors and systems.', 'Efficient, scalable and works well for large distributed systems.',
        'Forms the foundation for protocols used in DevOps tools, Cloud, Containers, and Microservices.'], 'ck'))
    tp = tip('In interviews, focus on understanding layer functions, real-world examples, and how data moves from one layer to another.')
    return chapter(4, 'TCP/IP Model (4 Layers)',
                   grid('g12', s1, s2) + grid('g2', s3, s4) + grid('g21', s5, tp))

# ---------------------------------------------------------------- 5
def ch5():
    t = ('<table><tr><th class="r">IPv4</th><th class="r">IPv6</th></tr><tr><td class="l"><ul class="dot">'
         '<li>32-bit address</li><li>Format: a.b.c.d<br>(0 – 255 each octet)</li><li>Example:<br><span class="k">192.168.1.10</span></li><li>Total Addresses: <span class="r">~4.3 Billion</span></li></ul></td>'
         '<td class="l"><ul class="dot"><li>128-bit address</li><li>Format: xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx</li>'
         '<li>Example:<br><span class="k">2001:0db8:85a3::8a2e:0370:7334</span></li><li>Total Addresses: <span class="r">~340 Undecillion</span></li></ul></td></tr></table>')
    s1 = sec(1, 'IPv4 vs IPv6', t + rem('IPv6 was created to overcome IPv4 address exhaustion and provide better scalability &amp; security.', ' '))
    pub = row(icon('ip_globe'), '<h3>Public IP <small>(Internet Reachable)</small></h3>' + ul(['Assigned by ISP', 'Unique globally', 'Used to communicate over the Internet', 'Example: <span class="r">8.8.8.8</span>']), 'w16')
    prv = row(icon('ip_house'), '<h3>Private IP <small>(Internal Use)</small></h3>' + ul(['Used inside private networks (LAN/VPC)', 'Not routable on the Internet', 'Saves public IPs',
           'Examples: <span class="r">10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16</span>']), 'w16')
    s2 = sec(2, 'Public vs Private IP', pub + prv)
    st = '<h3>Static IP</h3>' + ul(['Manually configured', 'Does not change', 'Used for servers, devices that need consistent access', 'Example: QA Insights Server <span class="r">49.36.12.5</span>'])
    dy = '<h3>Dynamic IP</h3>' + ul(['Assigned automatically by DHCP', 'Can change over time', 'Used for client devices', 'Example: QA Insights Developer Laptop <span class="r">(Changes periodically)</span>'])
    s3 = sec(3, 'Static vs Dynamic IP', grid('g2', f'<div>{st}</div>', f'<div>{dy}</div>'))
    s4 = sec(4, 'Loopback Address', row(icon('ip_loop'), ul([
        'Used by a device to communicate with itself.', 'Used for testing and local development.', 'IPv4 Loopback: <span class="r">127.0.0.1</span>', 'IPv6 Loopback: <span class="r">::1</span>']), 'w34')
        + rem('Packets sent to loopback never leave the device.', ' '))
    s5 = sec(5, 'CIDR <small>(Classless Inter-Domain Routing) — Introduction</small>',
             grid('g2', ul(['CIDR is a method of allocating IP addresses and routing IP packets.', 'It replaces traditional classful addressing.', 'Notation: IP Address / Prefix Length',
                            'Example: <span class="r">192.168.1.0/24</span><ul><li>/24 means first 24 bits are network part</li><li>Remaining 8 bits are for hosts</li></ul>',
                            'CIDR helps in efficient IP usage and route summarization.']),
                  fig('ip_cidr') + '<p style="text-align:center">Supports 2<sup>8</sup> − 2 = <b>254</b> usable hosts</p>' + fig('ip_cidr_ranges')), 'wide')
    return chapter(5, 'IP Addressing', grid('g2', col(s1, s3), col(s2, s4)) + s5 +
                   grid('g2', tip('Understand IP types, ranges, and CIDR deeply – these are frequently asked in DevOps &amp; Networking interviews!'),
                        rem('IP addressing is the foundation of all networking. Without IP, devices cannot communicate!')))

# ---------------------------------------------------------------- 6
def ch6():
    s1 = sec(1, 'Key Terms', ul([
        '<span class="r">Network ID</span> : Identifies the network portion of an IP.', '<span class="r">Host ID</span> : Identifies the specific device in that network.',
        '<span class="r">Subnet Mask</span> : Divides IP into network and host portions.', '<span class="r">CIDR Notation</span> : Short and efficient way to represent IP and subnet mask.',
        '<span class="r">Available Hosts</span> : Total usable IP addresses in a subnet.']))
    s2 = sec(2, 'IP Address Structure <small>(IPv4)</small>', fig('sub_struct'))
    mk = table(['CIDR', 'Subnet Mask', 'Network / Host Bits'], [
        ['/8', '255.0.0.0', '8 / 24'], ['/16', '255.255.0.0', '16 / 16'], ['/24', '255.255.255.0', '24 / 8'], ['/25', '255.255.255.128', '25 / 7'],
        ['/26', '255.255.255.192', '26 / 6'], ['/27', '255.255.255.224', '27 / 5'], ['/28', '255.255.255.240', '28 / 4'], ['/30', '255.255.255.252', '30 / 2']], 'soft')
    s3 = sec(3, 'Subnet Mask', '<p>A subnet mask is a 32-bit number that tells which part of the IP is <b>Network ID</b> and which part is <b>Host ID</b>.</p><h3 class="gr">Common Subnet Masks</h3>' + mk)
    s4 = sec(4, 'CIDR Notation', '<p>CIDR (Classless Inter-Domain Routing) removes the need for classful networks and allows variable length subnetting.</p>'
        '<p style="text-align:center"><span class="pill" style="border-color:var(--green);color:var(--ink)">Format: <span class="r">IP Address / Prefix Length</span></span></p><h3 class="gr">Examples</h3>' +
        ul(['<span class="r">192.168.1.0/24</span> → First 24 bits are network portion', '<span class="r">10.0.0.0/8</span> → First 8 bits are network portion',
            '<span class="r">172.16.5.0/16</span> → First 16 bits are network portion']) +
        tip('CIDR helps in efficient IP allocation, route summarization and reduces routing table size in Routers.'))
    fm = box('rem', 'Formula', '<p>Total Hosts = <b>2<sup>n</sup></b></p><p>Usable Hosts = <b>2<sup>n</sup> − 2</b></p><p style="font-size:8pt">Where <b>n</b> = number of host bits<br>(We subtract 2 for Network ID and Broadcast ID)</p>', ' ')
    ex = table(['CIDR', '/24'], [
        ['Host Bits (n)', '8'], ['Total Hosts (2<sup>n</sup>)', '2<sup>8</sup> = 256'], ['Usable Hosts (2<sup>n</sup> − 2)', '256 − 2 = 254'],
        ['Host Range', '192.168.1.1 – 192.168.1.254'], ['Network ID', '192.168.1.0'], ['Broadcast ID', '192.168.1.255']], 'soft')
    s5 = sec(5, 'Available Hosts Calculation',
             grid('g3', fm, f'<div><h3 class="gr" style="text-align:center">Example Calculation</h3><p style="text-align:center;margin:0">Given IP: <span class="r">192.168.1.10/24</span><br>Subnet Mask: <span class="r">255.255.255.0</span></p>{ex}</div>', fig('sub_net')) +
             rem('<ul class="ck"><li>Network ID → First IP in the subnet (all host bits = 0)</li><li>Broadcast ID → Last IP in the subnet (all host bits = 1)</li></ul>'), 'wide')
    return chapter(6, 'Subnetting &amp; CIDR', grid('g2', col(s1, s3), col(s2, s4)) + s5)

# ---------------------------------------------------------------- 7
def ch7():
    s1 = sec(1, 'MAC Address <small>(Media Access Control)</small>',
        f'<div class="row"><div class="tx">' + ul(['A unique hardware address assigned to Network Interface Card (NIC).', 'Works at <span class="r">Data Link Layer (Layer 2)</span>.',
        '<span class="r">48-bit address</span> (6 groups of 2 hex digits).', 'Format: <span class="r">00:1A:2B:3C:4D:5E</span>', 'Uniquely identifies a device on a local network.']) +
        f'</div><div class="ic w28">{icon("mac_nic")}</div></div>')
    pl = ('<table class="soft"><tr><th class="r">Physical Address (MAC)</th><th class="r">Logical Address (IP)</th></tr><tr><td class="l"><ul class="dot">'
          '<li>Hardware address</li><li>Layer 2 (Data Link)</li><li>Assigned by Manufacturer</li><li>Used for local network communication</li><li>Example:<br><span class="r">00:1A:2B:3C:4D:5E</span></li></ul></td>'
          '<td class="l"><ul class="dot"><li>Software address</li><li>Layer 3 (Network)</li><li>Assigned manually or by DHCP</li><li>Used for end-to-end communication</li><li>Example:<br><span class="r">192.168.1.10</span></li></ul></td></tr></table>')
    s2 = sec(2, 'Physical vs Logical Address', pl)
    s3 = sec(3, 'ARP <small>(Address Resolution Protocol)</small>', ul([
        'ARP maps <span class="r">IP address</span> (Logical) to <span class="r">MAC address</span> (Physical).', 'Works within the local network.',
        'If sender doesn’t know the MAC of destination IP, it sends an <span class="r">ARP Request (Broadcast)</span>.', 'Destination replies with <span class="r">ARP Reply (Unicast)</span> containing its MAC.']) +
        fig('arp_icon', '60%', 'ARP helps find the MAC address of a device using its IP.') +
        rem('ARP is like asking: “Who has <span class="r">192.168.1.10</span>? Tell <span class="r">192.168.1.20</span> that I am <span class="r">192.168.1.10</span>.”'))
    s4 = sec(4, 'ARP Process <small>(Broadcast &amp; Reply)</small>', fig('arp_proc'))
    tb = table(['MAC Address', 'Port'], [[f'<span class="r">{m}</span>', p] for m, p in [('00:1A:2B:3C:4D:5E', 'Port 1'), ('00:1A:2B:3C:4D:6F', 'Port 2'), ('00:1A:2B:3C:4D:7A', 'Port 3'), ('00:1A:2B:3C:4D:8B', 'Port 4'), ('…', '…')]], 'soft', first_name=False)
    s5 = sec(5, 'Switch MAC Table', grid('g2', ul(['Switch learns MAC addresses from incoming frames.', 'Stores in MAC Address Table with port information.', 'Used to forward frames only to the correct port (not broadcast).']),
        f'<div><h3 class="gr" style="text-align:center">Example MAC Table</h3>{tb}</div>'))
    s6 = sec(6, 'Packet Delivery Flow', fig('arp_flow') + ul([
        'Sender checks if destination IP is in same subnet.', 'Uses ARP to get destination MAC.', 'Sends frame to Switch (with destination MAC).',
        'Switch looks up MAC Table and forwards to correct port.', 'Destination receives the frame and processes it.'], 'nm'))
    kp = box('rem', 'Key Points', ul(['MAC = Hardware Address (Layer 2)', 'IP = Logical Address (Layer 3)', 'ARP maps IP → MAC', 'Switch uses MAC Table for intelligent forwarding'], 'ck'), '✅')
    tp = tip('Be clear about the difference between MAC &amp; IP, how ARP works, and how switches learn &amp; forward frames. These are commonly asked in DevOps, Network &amp; Cloud interviews.')
    return chapter(7, 'MAC Address &amp; ARP', grid('g2', s1, s2) + grid('g12', s3, s4) + grid('g2', s5, s6) + grid('g2', kp, tp))

# ---------------------------------------------------------------- 8
def ch8():
    s1 = sec(1, 'Connection-Oriented vs Connectionless',
        '<ul><li><span class="r">TCP is Connection-Oriented</span><br>A connection is established before data transfer and closed after completion.</li>'
        '<li><span class="r">UDP is Connectionless</span><br>No connection setup. Data is sent directly without establishing a session.</li></ul>')
    s3 = sec(3, 'Reliability vs Speed', grid('g2',
        '<div><h3 style="text-align:center">TCP</h3>' + ul(['Reliable delivery', 'Ensures data arrives in order', 'Error checking &amp; retransmission', 'Slower due to overhead'], 'ck') + '</div>',
        '<div><h3 style="text-align:center">UDP</h3>' + ul(['Best-effort delivery', 'No guarantee of order or delivery', 'No retransmission or error recovery', 'Faster and lightweight'], 'ck') + '</div>'))
    s2 = sec(2, 'Three-Way Handshake <small>(TCP)</small>', fig('tcp_hs', '92%'))
    s4 = sec(4, 'Real-World Examples', fig('tcp_examples'))
    cmpt = table(['Feature', 'TCP', 'UDP'], [
        ['Type', 'Connection-Oriented', 'Connectionless'], ['Connection Setup', 'Required (Three-way Handshake)', 'Not Required'],
        ['Reliability', 'Reliable (ACK + Retransmission)', 'Best-effort (No guarantees)'], ['Ordering', 'Maintains Order', 'No Order Guarantee'],
        ['Error Checking', 'Yes (Checksum, ACK)', 'Yes (Checksum only)'], ['Data Delivery', 'Guaranteed', 'Not Guaranteed'], ['Speed', 'Slower', 'Faster'],
        ['Overhead', 'Higher (Header + Handshake)', 'Lower (Minimal Header)'], ['Data Type', 'Stream (Continuous)', 'Datagram (Independent packets)'],
        ['Header Size', '20-60 Bytes', '8 Bytes'], ['Use Cases', 'Web, Email, File Transfer, DB, SSH', 'Gaming, Streaming, DNS, VoIP, IoT']], 'soft')
    cmpt = cmpt.replace('<th>TCP</th>', '<th class="r">TCP</th>').replace('<th>UDP</th>', '<th class="r">UDP</th>')
    s5 = sec(5, 'TCP vs UDP Comparison', cmpt)
    side = col(tip('<p>If data loss is acceptable but speed is critical → use <span class="r">UDP</span>.</p><p>If accuracy and reliability are important → use <span class="r">TCP</span>.</p>'),
               rem('<p><b>TCP</b> = <span class="r">T</span>rust, <span class="r">C</span>onfirm, <span class="r">P</span>rotect</p><p><b>UDP</b> = <span class="r">U</span>ser, <span class="r">D</span>atagram, <span class="r">P</span>erformance</p>'))
    kt = box('rem', 'Key Takeaway', f'<div class="row"><div class="tx"><p><b>TCP</b> is like a <b>phone call</b> (connection, reliable, ordered).</p><p><b>UDP</b> is like a <b>walkie-talkie</b> (no setup, fast, may lose packets).</p></div><div class="ic w28">{icon("tcp_phone")}</div></div>', '💡')
    return chapter(8, 'TCP vs UDP', grid('g2', col(s1, s2), col(s3, s4)) + grid('g21', s5, side) + kt,
                   lead='TCP and UDP are Transport Layer protocols used to transmit data between applications over an IP network.')

# ---------------------------------------------------------------- 9
def ch9():
    P = lambda ic, name, full, port, tr, purpose: [f'<span style="display:inline-block;width:11mm;vertical-align:middle">{icon(ic)}</span>', f'<div class="l" style="text-align:left"><b style="font:400 12pt Patrick Hand;color:var(--dark)">{name}</b><br><span style="font-size:7.6pt">({full})</span></div>', f'<span class="r" style="font-size:12pt">{port}</span>', f'<span class="r">{tr}</span>', purpose]
    rows = [
        P('port_http', 'HTTP', 'HyperText Transfer Protocol', '80', 'TCP', 'Unencrypted web traffic'),
        P('port_https', 'HTTPS', 'HTTP Secure', '443', 'TCP', 'Encrypted web traffic (SSL/TLS)'),
        P('port_ssh', 'SSH', 'Secure Shell', '22', 'TCP', 'Secure remote login &amp; command execution'),
        P('port_dns', 'DNS', 'Domain Name System', '53', 'UDP/TCP', 'Domain name resolution'),
        P('port_ftp', 'FTP', 'File Transfer Protocol', '21 (Control)<br>20 (Data)', 'TCP', 'File transfer (unencrypted)'),
        P('port_sftp', 'SFTP', 'SSH File Transfer Protocol', '22', 'TCP', 'Secure file transfer over SSH'),
        P('port_smtp', 'SMTP', 'Simple Mail Transfer Protocol', '25', 'TCP', 'Sending emails'),
    ]
    db = [P('port_mysql', 'MySQL', '', '3306', 'TCP', 'MySQL Database'), P('port_pg', 'PostgreSQL', '', '5432', 'TCP', 'PostgreSQL Database'),
          P('port_mongo', 'MongoDB', '', '27017', 'TCP', 'MongoDB Database'), P('port_redis', 'Redis', '', '6379', 'TCP', 'Redis Cache / Key-Value Store')]
    def rr(r): return '<tr><td style="width:14mm">' + r[0] + '</td><td>' + r[1].replace('<br><span style="font-size:7.6pt">()</span>', '') + '</td>' + ''.join(f'<td>{c}</td>' for c in r[2:]) + '</tr>'
    t = ('<table><tr><th colspan="2">Protocol / Service</th><th>Port</th><th class="r">Transport</th><th>Purpose</th></tr>' + ''.join(rr(r) for r in rows) +
         '<tr><th colspan="5" style="font-size:10.5pt;background:none">Database Ports</th></tr>' + ''.join(rr(r) for r in db) + '</table>')
    kp = box('rem', 'Key Points', ul(['Port + IP address uniquely identifies a service.', 'Well-known ports : <span class="r">0 – 1023</span>', 'Registered ports : <span class="r">1024 – 49151</span>',
                                       'Dynamic / Private ports : <span class="r">49152 – 65535</span>'], 'ck'), '✅')
    tp = tip('<p>Always mention the protocol along with the port (e.g., <span class="r">80/TCP</span>, <span class="r">53/UDP</span>).</p><p>Firewall rules are based on IP, port and protocol.</p>')
    return chapter(9, 'Ports &amp; Common Protocols', t + grid('g2', kp, tp),
                   lead='Ports are logical endpoints used by protocols to identify applications and services on a host.')
