### 0.19.0

#### Customization sync

Since `Plugin and their settings` have been broken, so I tried to fix it, not just fix it, but fix it the way it should be.

Now, we have `Customization sync`.

It is a real shame that the compatibility between these features has been broken. However, this new feature is surely useful and I believe that worth getting over the pain.
We can use the new feature with the same configuration. Only the menu on the command palette has been changed. The dialog can be opened by `Show customization sync dialog`.

I hope you will give it a try.

#### Minors
- 0.19.1
  - Fixed: Fixed hidden file handling on Linux
  - Improved: Now customization sync works more smoothly.
- 0.19.2
  - Fixed:
    - Fixed garbage collection error while unreferenced chunks exist many.
    - Fixed filename validation on Linux.
  - Improved:
    - Showing status is now thinned for performance.
    - Enhance caching while collecting chunks.
- 0.19.3
  - Improved:
    - Now replication will be paced by collecting chunks. If synchronisation has been deadlocked, please enable `Do not pace synchronization` once.
- 0.19.4
  - Improved:
    - Reduced remote database checking to improve speed and reduce bandwidth.
  - Fixed:
    - Chunks which previously misinterpreted are now interpreted correctly.
      - No more missing chunks which not be found forever, except if it has been actually missing.
    - Deleted file detection on hidden file synchronising now works fine.
    - Now the Customisation sync is surely quiet while it has been disabled.
- 0.19.5
  - Fixed:
    - Now hidden file synchronisation would not be hanged, even if so many files exist.
  - Improved:
    - Customisation sync works more smoothly.
  - Note: Concurrent processing has been rollbacked into the original implementation. As a result, the total number of processes is no longer shown next to the hourglass icon. However, only the processes that are running concurrently are shown.
- 0.19.6
  - Fixed:
    - Logging has been tweaked.
    - No more too many planes and rockets.
    - The batch database update now surely only works in non-live mode.
  - Internal things:
    - Some frameworks has been upgraded.
    - Import declaration has been fixed.
  - Improved:
    - The plug-in now asks to enable a new adaptor, when rebuilding, if it is not enabled yet.
    - The setting dialogue refined.
      - Configurations for compatibilities have been moved under the hatch.
      - Made it clear that disabled is the default.
      - Ambiguous names configuration have been renamed.
      - Items that have no meaning in the settings are no longer displayed.
      - Some items have been reordered for clarity.
      - Each configuration has been grouped.
- 0.19.7
  - Fixed:
    - The initial pane of Setting dialogue is now changed to General Settings.
    - The Setup Wizard is now able to flush existing settings and get into the mode again.
- 0.19.8
  - New feature:
    - Vault history: A tab has been implemented to give a birds-eye view of the changes that have occurred in the vault.
  - Improved:
    - Now the passphrases on the dialogue masked out. Thank you @antoKeinanen!
    - Log dialogue is now shown as one of tabs.
  - Fixed:
    - Some minor issues has been fixed.
- 0.19.9
  - New feature (For fixing a problem):
    - We can fix the database obfuscated and plain paths that have been mixed up.
  - Improvements
    - Customisation Sync performance has been improved.
- 0.19.10
  - Fixed
    - Fixed the issue about fixing the database.
- 0.19.11
  - Improvements:
    - Hashing ChunkID has been improved.
    - Logging keeps 400 lines now.
  - Refactored:
    - Import statement has been fixed about types.
### 0.18.0

#### Now, paths of files in the database can now be obfuscated. (Experimental Feature)
At before v0.18.0, Self-hosted LiveSync used the path of files, to detect and resolve conflicts. In naive. The ID of the document stored in the CouchDB was naturally the filename.
However, it means a sort of lacking confidentiality. If the credentials of the database have been leaked, the attacker (or an innocent bystander) can read the path of files. So we could not use confidential things in the filename in some environments.
Since v0.18.0, they can be obfuscated. so it is no longer possible to decipher the path from the ID. Instead of that, it costs a bit CPU load than before, and the data structure has been changed a bit.

We can configure the `Path Obfuscation` in the `Remote database configuration` pane.  
Note: **When changing this configuration, we need to rebuild both of the local and the remote databases**.

#### Minors 
- 0.18.1
  - Fixed:
    - Some messages are fixed (Typo)
    - File type detection now works fine!
- 0.18.2
  - Improved:
    - The setting pane has been refined.
    - We can enable `hidden files sync` with several initial behaviours; `Merge`, `Fetch` remote, and `Overwrite` remote.
    - No longer `Touch hidden files`.
- 0.18.3
  - Fixed Pop-up is now correctly shown after hidden file synchronisation.
- 0.18.4
  - Fixed:
      - `Fetch` and `Rebuild database` will work more safely.
      - Case-sensitive renaming now works fine.
        Revoked the logic which was made at #130, however, looks fine now.
- 0.18.5
  - Improved:
    - Actions for maintaining databases moved to the `🎛️Maintain databases`.
    - Clean-up of unreferenced chunks has been implemented on an **experimental**.
      - This feature requires enabling `Use new adapter`.
      - Be sure to fully all devices synchronised before perform it.
      - After cleaning up the remote, all devices will be locked out. If we are sure had it be synchronised, we can perform only cleaning-up locally. If not, we have to perform `Fetch`.

- 0.18.6
  - New features:
    - Now remote database cleaning-up will be detected automatically.
    - A solution selection dialogue will be shown if synchronisation is rejected after cleaning or rebuilding the remote database.
    - During fetching or rebuilding, we can configure `Hidden file synchronisation` on the spot.
      - It let us free from conflict resolution on initial synchronising.

### 0.17.0
- 0.17.0 has no surfaced changes but the design of saving chunks has been changed. They have compatibility but changing files after upgrading makes different chunks than before 0.16.x.
  Please rebuild databases once if you have been worried about storage usage.

  - Improved:
    - Splitting markdown
    - Saving chunks

  - Changed:
    - Chunk ID numbering rules

#### Minors

- 0.17.1
  - Fixed: Now we can verify and repair the database.
  - Refactored inside.

- 0.17.2
  - New feature
    - We can merge conflicted documents automatically if sensible.
  - Fixed
    - Writing to the storage will be pended while they have conflicts after replication.

- 0.17.3
  - Now we supported canvas! And conflicted JSON files are also synchronised with merging its content if they are obvious.

- 0.17.4
  - Canvases are now treated as a sort of plain text file. now we transfer only the metadata and chunks that have differences.

- 0.17.5 Now `read chunks online` had been fixed, and a new feature: `Use dynamic iteration count` to reduce the load on encryption/decryption.
  Note: `Use dynamic iteration count` is not compatible with earlier versions.
- 0.17.6 Now our renamed/deleted files have been surely deleted again.
- 0.17.7
  - Fixed:
    - Fixed merging issues.
    - Fixed button styling.
  - Changed:
    - Conflict checking on synchronising has been enabled for every note in default.
- 0.17.8
  - Improved: Performance improved. Prebuilt PouchDB is no longer used.
  - Fixed: Merging hidden files is also fixed.
  - New Feature: Now we can synchronise automatically after merging conflicts.
- 0.17.9
  - Fixed: Conflict merge of internal files is no longer broken.
  - Improved: Smoother status display inside the editor.
- 0.17.10
  - Fixed: Large file synchronising has been now addressed!
  Note: When synchronising large files, we have to set `Chunk size` to lower than 50, disable `Read chunks online`, `Batch size` should be set 50-100, and `Batch limit` could be around 20.
- 0.17.11
  - Fixed:
    - Performance improvement
    - Now `Chunk size` can be set to under one hundred.
  - New feature:
    - The number of transfers required before replication stabilises is now displayed.
- 0.17.12: Skipped.
- 0.17.13
  - Fixed: Document history is now displayed again.
  - Reorganised: Many files have been refactored.
- 0.17.14: Skipped.
- 0.17.15
  - Improved:
    - Confidential information has no longer stored in data.json as is.
    - Synchronising progress has been shown in the notification.
    - We can commit passphrases with a keyboard.
    - Configuration which had not been saved yet is marked now.
    - Now the filename is shown on the Conflict resolving dialog
  - Fixed:
    - Hidden files have been synchronised again.
    - Rename of files has been fixed again.
  And, minor changes have been included.
- 0.17.16:
  - Improved:
    - Plugins and their settings no longer need scanning if changes are monitored.
    - Now synchronising plugins and their settings are performed parallelly and faster.
    - We can place `redflag2.md` to rebuild the database automatically while the boot sequence.
  - Experimental:
    - We can use a new adapter on PouchDB. This will make us smoother. 
      - Note: Not compatible with the older version. 
  - Fixed:
    - The default batch size is smaller again.
    - Plugins and their setting can be synchronised again.
    - Hidden files and plugins are correctly scanned while rebuilding.
    - Files with the name started `_` are also being performed conflict-checking.
- 0.17.17
  - Fixed: Now we can merge JSON files even if we failed to compare items like null.
- 0.17.18
  - Fixed: Fixed lack of error handling.
- 0.17.19 
  - Fixed: Error reporting has been ensured.
- 0.17.20
  - Improved: Changes of hidden files will be notified to Obsidian.
- 0.17.21
  - Fixed: Skip patterns now handle capital letters.
  - Improved
    - New configuration to avoid exceeding throttle capacity.
      - We have been grateful to @karasevm!
    - The conflicted `data.json` is no longer merged automatically.
      - This behaviour is not configurable, unlike the `Use newer file if conflicted` of normal files.
- 0.17.22
  - Fixed:
    - Now hidden files will not be synchronised while we are not configured.
    - Some processes could start without waiting for synchronisation to complete, but now they will wait for.
  - Improved
    - Now, by placing `redflag3.md`, we can discard the local database and fetch again.
    - The document has been updated! Thanks to @hilsonp!
- 0.17.23
  - Improved:
    - Now we can preserve the logs into the file.
      - Note: This option will be enabled automatically also when we flagging a red flag.
    - File names can now be made platform-appropriate.
  - Refactored:
    - Some redundant implementations have been sorted out.
- 0.17.24
  - New feature:
    - If any conflicted files have been left, they will be reported.
  - Fixed:
    - Now the name of the conflicting file is shown on the conflict-resolving dialogue.
    - Hidden files are now able to be merged again.
    - No longer error caused at plug-in being loaded.
  - Improved:
    - Caching chunks are now limited in total size of cached chunks.
- 0.17.25
  - Fixed:
    - Now reading error will be reported.
- 0.17.26
  - Fixed(Urgent):
    - The modified document will be reflected in the storage now.
- 0.17.27
  - Improved:
    - Now, the filename of the conflicted settings will be shown on the merging dialogue
    - The plugin data can be resolved when conflicted.
    - The semaphore status display has been changed to count only.
    - Applying to the storage will be concurrent with a few files.
- 0.17.28
  -Fixed:
    - Some messages have been refined.
    - Boot sequence has been speeded up.
    - Opening the local database multiple times in a short duration has been suppressed.
    - Older migration logic. 
      - Note: If you have used 0.10.0 or lower and have not upgraded, you will need to run 0.17.27 or earlier once or reinstall Obsidian.
- 0.17.29
  - Fixed:
    - Requests of reading chunks online are now split into a reasonable(and configurable) size.
    - No longer error message will be shown on Linux devices with hidden file synchronisation.
  - Improved:
    - The interval of reading chunks online is now configurable.
    - Boot sequence has been speeded up, more.
  - Misc:
    - Messages on the boot sequence will now be more detailed. If you want to see them, please enable the verbose log.
    - Logs became be kept for 1000 lines while the verbose log is enabled.
- 0.17.30
  - Implemented:
    - `Resolve all conflicted files` has been implemented.
  - Fixed:
    - Fixed a problem about reading chunks online when a file has more chunks than the concurrency limit.
  - Rollbacked:
    - Logs are kept only for 100 lines, again.
- 0.17.31
  - Fixed:
    - Now `redflag3` can be run surely.
    - Synchronisation can now be aborted.
  - Note: The synchronisation flow has been rewritten drastically. Please do not haste to inform me if you have noticed anything.
- 0.17.32
  - Fixed:
    - Now periodic internal file scanning works well.
    - The handler of Window-visibility-changed has been fixed.
    - And minor fixes possibly included.
  - Refactored:
    - Unused logic has been removed.
    - Some utility functions have been moved into suitable files.
    - Function names have been renamed.
- 0.17.33
  - Maintenance update: Refactored; the responsibilities that `LocalDatabase` had were shared. (Hoping) No changes in behaviour.
- 0.17.34
  - Fixed: The `Fetch` that was broken at 0.17.33 has been fixed.
  - Refactored again: Internal file sync, plug-in sync and Set up URI have been moved into each file.

### 0.16.0
- Now hidden files need not be scanned. Changes will be detected automatically.
  - If you want it to back to its previous behaviour, please disable `Monitor changes to internal files`.
  - Due to using an internal API, this feature may become unusable with a major update. If this happens, please disable this once.

#### Minors

- 0.16.1 Added missing log updates.
- 0.16.2 Fixed many problems caused by combinations of `Sync On Save` and the tracking logic that changed at 0.15.6.
- 0.16.3
  - Fixed detection of IBM Cloudant (And if there are some issues, be fixed automatically).
  - A configuration information reporting tool has been implemented.
- 0.16.4 Fixed detection failure. Please set the `Chunk size` again when using a self-hosted database.
- 0.16.5
  - Fixed
    - Conflict detection and merging now be able to treat deleted files.
    - Logs while the boot-up sequence has been tidied up.
    - Fixed incorrect log entries.
  - New Feature
    - The feature of automatically deleting old expired metadata has been implemented.
    We can configure it in `Delete old metadata of deleted files on start-up` in the `General Settings` pane.
- 0.16.6
  - Fixed
    - Automatic (temporary) batch size adjustment has been restored to work correctly.
    - Chunk splitting has been backed to the previous behaviour for saving them correctly.
  - Improved
    - Corrupted chunks will be detected automatically.
    - Now on the case-insensitive system, `aaa.md` and `AAA.md` will be treated as the same file or path at applying changesets.
- 0.16.7 Nothing has been changed except toolsets, framework library, and as like them. Please inform me if something had been getting strange!
- 0.16.8 Now we can synchronise without `bad_request:invalid UTF-8 JSON` even while end-to-end encryption has been disabled.

Note:
Before 0.16.5, LiveSync had some issues making chunks. In this case, synchronisation had became been always failing after a corrupted one should be made. After 0.16.6, the corrupted chunk is automatically detected. Sorry for troubling you but please do `rebuild everything` when this plug-in notified so.

### 0.15.0
- Outdated configuration items have been removed. 
- Setup wizard has been implemented!

I appreciate for reviewing and giving me advice @Pouhon158!

#### Minors
- 0.15.1 Missed the stylesheet.
- 0.15.2 The wizard has been improved and documented!
- 0.15.3 Fixed the issue about locking/unlocking remote database while rebuilding in the wizard.
- 0.15.4 Fixed issues about asynchronous processing (e.g., Conflict check or hidden file detection)
- 0.15.5 Add new features for setting Self-hosted LiveSync up more easier.
- 0.15.6 File tracking logic has been refined.
- 0.15.7 Fixed bug about renaming file.
- 0.15.8 Fixed bug about deleting empty directory, weird behaviour on boot-sequence on mobile devices.
- 0.15.9 Improved chunk retrieving, now chunks are retrieved in batch on continuous requests.
- 0.15.10 Fixed:
  - The boot sequence has been corrected and now boots smoothly.
  - Auto applying of batch save will be processed earlier than before.

### 0.14.1
- The target selecting filter was implemented.
  Now we can set what files are synchronised by regular expression.
- We can configure the size of chunks.
  We can use larger chunks to improve performance.
  (This feature can not be used with IBM Cloudant)
-  Read chunks online.
  Now we can synchronise only metadata and retrieve chunks on demand. It reduces local database size and time for replication.
- Added this note.
- Use local chunks in preference to remote them if present,

#### Recommended configuration for Self-hosted CouchDB
- Set chunk size to around 100 to 250 (10MB - 25MB per chunk)
- *Set batch size to 100 and batch limit to 20 (0.14.2)*
- Be sure to `Read chunks online` checked.

#### Minors
- 0.14.2 Fixed issue about retrieving files if synchronisation has been interrupted or failed
- 0.14.3 New test items have been added to `Check database configuration`.
- 0.14.4 Fixed issue of importing configurations.
- 0.14.5 Auto chunk size adjusting implemented.
- 0.14.6 Change Target to ES2018
- 0.14.7 Refactor and fix typos.
- 0.14.8 Refactored again. There should be no change in behaviour, but please let me know if there is any.

### 0.13.0

- The metadata of the deleted files will be kept on the database by default. If you want to delete this as the previous version, please turn on `Delete metadata of deleted files.`. And, if you have upgraded from the older version, please ensure every device has been upgraded.
- Please turn on `Delete metadata of deleted files.` if you are using livesync-classroom or filesystem-livesync.
- We can see the history of deleted files.
- `Pick file to show` was renamed to `Pick a file to show.
- Files in the `Pick a file to show` are now ordered by their modified date descent.
- Update information became to be shown on the major upgrade.

#### Minors
- 0.13.1 Fixed on conflict resolution.
- 0.13.2 Fixed file deletion failures.
- 0.13.4
  - Now, we can synchronise hidden files that conflicted on each devices.
  - We can search for conflicting docs.
  - Pending processes can now be run at any time.
  - Performance improved on synchronising large numbers of files at once.
